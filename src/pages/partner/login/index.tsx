'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { useAuthPartner } from "@/src/hooks/partner/auth"

import AlertError from "@/src/components/AlertError"
import AlertSuccess from "@/src/components/AlertSuccess"
import Processing from "@/src/components/Processing"
import {useMessageSuccess} from "@/src/hooks/message/success";
import {useMessageError} from "@/src/hooks/message/error";

const Login = () => {
    const { signIn } = useAuthPartner()
    const router = useRouter()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [processing, setProcessing] = useState<boolean>(false)

    const { message, showMessage } = useMessageSuccess()
    const { messageError , setMessageError} = useMessageError()

    const handleLogin = async (e: any) => {
        e.preventDefault()
        setProcessing(true)

        const response = await signIn({
            email: email,
            password: password
        })

        if (response) {
            showMessage("Logged.")
            router.push("/partner/")
        }

        if (!response) {
            setProcessing(false)
            setMessageError("Access denied. Please review your email and password information and try again.")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setMessageError('')
        }, 10000)
    }, [messageError])

    return (
        <form onSubmit={handleLogin}
            className="bg-login bg-cover bg-center w-screen h-screen flex items-center justify-center px-25px">

            { messageError && <AlertError text={messageError} /> }
            { message && <AlertSuccess text={message} /> }

            <div className="w-540px h-auto p-35px md:px-50px md:py-60px bg-white rounded-8px shadow-login">
                <div className="w-100% flex justify-center">
                    <Image
                        src="/logo-enco.svg"
                        alt="Logo encoparts"
                        width="114"
                        height="28"
                    />
                </div>

                <h1 className="text-13px text-black_two font-inter font-medium text-center mt-5">
                    Login with your email
                </h1>

                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    className="w-100% h-50px rounded-8px border-1 px-4 text-13px font-normal text-black mt-6 focus:outline-yellow_one" />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-100% h-50px rounded-8px border-1 px-4 text-13px font-normal text-black mt-4 focus:outline-yellow_one"
                />

                <Link href="#" className="w-100% flex items-center justify-end my-5 text-black text-13px font-inter font-medium">
                    Forgot Password?
                </Link>

                <button
                    type="submit"
                    className="w-100% h-50px md:h-60px bg-yellow_one flex items-center justify-center text-white text-13px font-inter font-medium mt-5 rounded-8px">
                    Log in
                    { processing && <Processing/> }
                </button>
            </div>
        </form>
    )
}

export default Login;
