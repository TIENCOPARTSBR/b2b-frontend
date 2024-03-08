import Main from "@/src/components/Admin/Main";
import AlertError from "@/src/components/AlertError";
import Processing from "@/src/components/Processing";
import React, {useState} from "react";
import {getApiDealer} from "@/src/api/dealer/axios";
import {useAuthDealer} from "@/src/hooks/dealer/auth";
import Title from "@/src/components/Title";
import ButtonSmall from "@/src/components/ButtonSmall";
import { useMessageSuccess } from "@/src/hooks/message/success";
import {getApiAdmin} from "@/src/api/adm/axios";
import {useAuthAdmin} from "@/src/hooks/adm/auth";

const ChangePassswordAdmin = () => {
    const { user, logout } = useAuthAdmin()

    const [password, setPassword] = useState<string|null>(null)
    const [passwordConfirmation, setPasswordConfirmation] = useState<string|null>(null)

    const { showMessage: showMessageSuccess } = useMessageSuccess()
    const [alertError, setAlertError] = useState<string|null>(null)
    const [processing, setProcessing] = useState<boolean>(false)

    const handleFormLogin = (e: any) => {
        e.preventDefault()
        setProcessing(true)

        const api = getApiAdmin('')

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

            setAlertError(errorsString)
        })
        .finally(() => {
            setProcessing(false)
            setTimeout(() => {
                setAlertError(null)
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
                { alertError && <AlertError text={alertError}/> }

                <div className="w-100% flex justify-between mb-2">
                    <input
                        className="w-100% lg:w-49% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px mb-4"
                        type="password"
                        placeholder="Enter your password"
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        className="w-100% lg:w-49% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px mb-5"
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

export default ChangePassswordAdmin;