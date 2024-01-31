import Image from "next/image";
import Link from "next/link";

const Login = () => {
    return (
        <main className="bg-login bg-cover bg-center w-screen h-screen flex items-center justify-center px-25px">
            <div className="w-540px h-auto p-35px md:px-50px md:py-60px bg-white rounded-8px shadow-login">
                <div className="w-100% flex justify-center">
                    <Image src="/logo-enco.svg"
                           alt="Logo encoparts"
                           width="114"
                           height="28"/>
                </div>

                <h1 className="text-14px text-black_two font-inter font-medium text-center mt-5">Reset your password</h1>

                <input type="password"
                       placeholder="Type your password"
                       className="w-100% h-55px rounded-8px border-1 px-4 text-14px font-normal text-black mt-5 focus:outline-yellow_one" />

                <input type="password"
                       placeholder="Type your password again"
                       className="w-100% h-55px rounded-8px border-1 px-4 text-14px font-normal text-black mt-4 focus:outline-yellow_one" />

                <button type="submit"
                        className="w-100% h-50px md:h-60px bg-yellow_one flex items-center justify-center text-black text-14px font-inter font-semibold mt-8 rounded-8px">Confirm</button>
            </div>
        </main>
    )
}

export default Login;