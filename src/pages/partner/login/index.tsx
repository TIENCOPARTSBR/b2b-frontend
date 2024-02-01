'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { useAuthPartner } from "@/src/hooks/partner/auth"

import AlertError from "@/src/components/AlertError"
import AlertSuccess from "@/src/components/AlertSuccess"
import Processing from "@/src/components/Processing"

const Login = () => {
    const { signIn } = useAuthPartner()
    const router = useRouter()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [processing, setProcessing] = useState<boolean>(false)

    const [alertError, setAlertError] = useState<string|null>(null)
    const [alertSuccess, setAlertSuccess] = useState<string|null>(null)

    const handleLogin = async (e: any) => {
        e.preventDefault()
        setProcessing(true)

        const response = await signIn({
            email: email,
            password: password
        })

        if (response) {
            setAlertSuccess("Logged.")
            setTimeout(() => {
                router.push("/partner/")
            }, 1000)
        }

        if (!response) {
            setProcessing(false)
            setAlertError("Access denied. Please review your email and password information and try again.")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setAlertError(null)
        }, 3000)
    }, [alertError])

    return (
        <form onSubmit={handleLogin}
            className="bg-login bg-cover bg-center w-screen h-screen flex items-center justify-center px-25px">

            { alertError && <AlertError text={alertError} /> }
            { alertSuccess && <AlertSuccess text={alertSuccess} /> }

            <div className="w-540px h-auto p-35px md:px-50px md:py-60px bg-white rounded-8px shadow-login">
                <div className="w-100% flex justify-center">
                    <Image
                        src="/logo-enco.svg"
                        alt="Logo encoparts"
                        width="114"
                        height="28"
                    />
                </div>

                <h1 className="text-14px text-black_two font-inter font-medium text-center mt-5">
                    Login with your email
                </h1>

                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    className="w-100% h-50px rounded-8px border-1 px-4 text-14px font-normal text-black mt-6 focus:outline-yellow_one" />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-100% h-50px rounded-8px border-1 px-4 text-14px font-normal text-black mt-4 focus:outline-yellow_one"
                />

                <Link href="#" className="w-100% flex items-center justify-end my-5 text-black text-14px font-inter font-medium">
                    Forgot Password?
                </Link>

                <button
                    type="submit"
                    className="w-100% h-50px md:h-60px bg-yellow_one flex items-center justify-center text-white text-14px font-inter font-medium mt-5 rounded-8px">
                    Log in
                    { processing && <Processing/> }
                </button>
            </div>
        </form>
    )
}

export default Login;