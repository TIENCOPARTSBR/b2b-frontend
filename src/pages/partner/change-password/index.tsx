
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useMessageSuccess } from "@/src/hooks/message/success";

import Main from "@/src/components/Partner/Main";
import Title from "@/src/components/Title";
import ButtonSmall from "@/src/components/ButtonSmall";
import AlertError from "@/src/components/AlertError";
import Processing from "@/src/components/Processing";
import {useAuthPartner} from "@/src/hooks/partner/auth";
import {getApiPartner} from "@/src/api/partner/axios";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import {useMessageError} from "@/src/hooks/message/error";

const ChangePassword = () => {
    const { user, logout } = useAuthPartner('')
    const router = useRouter()

    const [password, setPassword] = useState<string|null>(null)
    const [passwordConfirmation, setPasswordConfirmation] = useState<string|null>(null)

    const { showMessage: showMessageSuccess } = useMessageSuccess()
    const { setMessageError } = useMessageError()
    const [processing, setProcessing] = useState<boolean>(false)

    const handleFormLogin = (e: any) => {
        e.preventDefault()
        setProcessing(true)

        const api = getApiPartner('')

        api.put('/user/reset-password', {
            id: user?.id,
            password: password,
            password_confirmation: passwordConfirmation,
        })
        .then((response) => {
            showMessageSuccess(response?.data?.message + "\n Please log in again.")
            logout()
        })
        .catch((e) => {
            let errorsString = ""

            Object.keys(e?.response?.data?.errors).forEach((key) => {
                e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                    errorsString += `${errorMessage}<br>`
                })
            })

            setMessageError(errorsString)
        })
        .finally(() => {
            setProcessing(false)

            setTimeout(() => {
                setMessageError('')
            }, 10000)
        })
    }

    return (
        <Main>
            <div className="w-100% md:w-50% flex flex-col mb-25px">
                <Title title={'Change password'}/>
            </div>

            <form onSubmit={handleFormLogin}
                  className="w-100%p-25px rounded-8px flex flex-wrap md:justify-between">
                <div className="w-100% flex justify-between mb-2">
                    <input
                        className="w-100% lg:w-49% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px mb-4"
                        type="password"
                        placeholder="Enter your password"
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        className="w-100% lg:w-49% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px mb-5"
                        type="password"
                        placeholder="Confirm your password"
                        required={true}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </div>

                <ButtonSmall bgColor="bg-yellow_one">
                    Change password
                    {processing && <Processing/>}
                </ButtonSmall>
            </form>
        </Main>
    )
}

export default ChangePassword;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {['partnerAuth.token']: token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/partner/login",
                permanent: false,
            }
        }
    }

    return {
        props: {
        }
    }
}
