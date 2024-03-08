"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { useAuthPartner } from "@/src/hooks/partner/auth"

const Profile = () => {
    const { user, logout } = useAuthPartner()
    const [ isOpen, setIsOpen] = useState(false)
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    const handleLogout = async () => {
        logout()
    }

    return (
        <div className="relative">
            <button
                className={`w-45px h-45px rounded-3xl flex items-center justify-center hover:bg-yellow_one transition-all ease-in-out duration-300 ${ isOpen ? 'bg-yellow_one' : ''}`}
                onClick={() => { handleClick() }}>
                <Image
                    src="/icon/icon-profile.svg"
                    alt="Icon profile"
                    width="24"
                    height="24"
                />
            </button>

            { isOpen && (
                <div
                    className="w-350px bg-white absolute top-50px right-10px p-25px flex flex-col rounded-lg border-1 border-grey_one shadow-profile"
                    onMouseLeave={() => { handleClick() }}
                >
                    <h2 className="w-auto text-left mb-1 text-13px font-semibold text-black font-inter">{user?.name}</h2>
                    <p className="w-auto text-left mb-3 text-13px font-normal text-grey_for font-inter">{user?.email}</p>

                    <Link href={`/partner/change-password`} className="w-100 flex items-center justify-between py-3 pb-6">
                        <div className="flex items-center font-inter text-13px text-black font-normal">
                            <Image
                                src="/icon/icon-lock.svg"
                                alt="Icon change password"
                                width="20"
                                height="20"
                                className="mr-2 mt-0.5"
                            />
                            Change Password
                        </div>
                        <Image
                            src="/icon/icon-arrow-right.svg"
                            alt="Icon arrow right"
                            width="16"
                            height="16"
                            className="mr-2 mt-0.5"
                        />
                    </Link>

                    <button className="w-auto bg-yellow_one h-40px text-black flex rounded-60px mb-0 text-13px font-normal items-center justify-center font-inter"
                        onClick={handleLogout}>
                        <Image
                            src="/icon/icon-logout.svg"
                            alt="Icon logout"
                            width="12"
                            height="12"
                            className="mr-2 mt-0.5"
                        />
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default Profile