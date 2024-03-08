'use client';

import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useAuthDealer} from "@/src/hooks/dealer/auth";
import AlertError from "@/src/components/AlertError";
import {GetServerSideProps} from "next";
import {parseCookies, setCookie} from "nookies";
import Processing from "@/src/components/Processing";
import AlertSuccess from "@/src/components/AlertSuccess";
import {useMessageSuccess} from "@/src/hooks/message/success";

const Login = () => {
    const { signIn } = useAuthDealer();
    const router = useRouter()
    const {['dealerAuth.rememberEmail']: rememberEmail} = parseCookies();
    const {['dealerAuth.rememberPassword']: rememberPassword} = parseCookies();

    const [email, setEmail] = useState<string>(rememberEmail || '')
    const [password, setPassword] = useState<string>(rememberPassword || '')
    const [processing, setProcessing] = useState<boolean>(false)

    const { message: messageSuccess, showMessage: showMessageSuccess } = useMessageSuccess()
    const [alertError, setAlertError] = useState<string|null>(null)

    const handleLogin = async (e: any) => {
        e.preventDefault()
        setProcessing(true)

        const response = await signIn({
            email: email,
            password: password
        })

        if (response) {
            verifyRememberCheckbox()
            showMessageSuccess('Logged.')
            router.push('/')
        }

        if (!response) {
            setProcessing(false)
            setAlertError('Access denied. Please review your email and password information and try again.')
        }
    }

    const verifyRememberCheckbox = () => {
        let rememberCheckbox: HTMLInputElement | null = document.getElementById('remember') as HTMLInputElement | null;
        let rememberChecked = (rememberCheckbox) ? rememberCheckbox.checked : false;

        if (rememberChecked) {
            setCookie(undefined, 'dealerAuth.rememberEmail', email, {
                maxAge: 999999,
                path: '/',
            });

            setCookie(undefined, 'dealerAuth.rememberPassword', password, {
                maxAge: 999999,
                path: '/',
            });
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setAlertError(null)
        }, 3000)
    }, [alertError]);

    return (
        <form onSubmit={handleLogin}
            className="bg-login bg-cover bg-center w-screen h-screen flex items-center justify-center px-25px">

            { alertError && <AlertError text={alertError} />}
            { messageSuccess && <AlertSuccess text={ messageSuccess } />}

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
                    value={email}
                    className="w-100% h-50px rounded-8px border-1 px-4 text-13px font-normal text-black mt-6 focus:outline-yellow_one" />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="w-100% h-50px rounded-8px border-1 px-4 text-13px font-normal text-black mt-4 focus:outline-yellow_one"
                />

                <div className="flex items-center justify-between my-5 text-black text-13px font-inter font-medium">
                    <label htmlFor="remember" className="flex items-center">
                        <input id="remember" type="checkbox" checked={rememberEmail != '' && rememberPassword != ''} className="w-15px h-15px mr-2"/>
                        Remember me
                    </label>

                    <Link href="#">
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className="w-100% h-50px md:h-60px bg-yellow_one flex items-center justify-center text-white text-13px font-inter font-medium mt-5 rounded-8px">
                    Log in
                    {processing && <Processing/>}
                </button>
            </div>
        </form>
    )
}

export default Login;
