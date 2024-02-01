import MainDirectDistributor from "@/src/components/Main";
import AlertError from "@/src/components/AlertError";
import AlertSuccess from "@/src/components/AlertSuccess";
import Image from "next/image";
import Link from "next/link";
import Processing from "@/src/components/Processing";
import React, {useState} from "react";
import {getApiDealer} from "@/src/api/dealer/axios";
import {useAuthDealer} from "@/src/hooks/dealer/auth";
import {useRouter} from "next/navigation";
import Title from "@/src/components/Title";
import ButtonSmall from "@/src/components/ButtonSmall";
import Breadcrumb from "@/src/components/Breadcrumb";
import {breadcrumb, title} from "@/src/utils/constants/Dealer/Partner/New/util";
import {useMessageSuccess} from "@/src/hooks/message/success";

const ChangePassword = () => {
    const { user, logout } = useAuthDealer()

    const [password, setPassword] = useState<string|null>(null)
    const [passwordConfirmation, setPasswordConfirmation] = useState<string|null>(null)

    const { message: messageSuccess, showMessage: showMessageSuccess } = useMessageSuccess()
    const [alertError, setAlertError] = useState<string|null>(null)
    const [processing, setProcessing] = useState<boolean>(false)

    const handleFormLogin = (e: any) => {
        e.preventDefault()
        setProcessing(true)

        const api = getApiDealer('')

        api.put('/user/change-password', {
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
            }, 2500)
        })
    }

    return (
        <MainDirectDistributor>
            <div className="w-100% md:w-50% flex flex-col mb-25px">
                <Title title={'Change password'}/>
            </div>

            <form onSubmit={handleFormLogin}
                  className="w-100%p-25px rounded-8px flex flex-wrap md:justify-between">
                { alertError && <AlertError text={alertError}/> }

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
        </MainDirectDistributor>
    )
}

export default ChangePassword;