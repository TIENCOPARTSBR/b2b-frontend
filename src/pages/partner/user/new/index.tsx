import React, { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import {
    breadcrumb,
    title
} from "@/src/utils/constants/Partner/User/New/util";

import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Label from "@/src/components/Label";
import ButtonSmall from "@/src/components/ButtonSmall";
import AlertError from "@/src/components/AlertError";
import Processing from "@/src/components/Processing";
import Main from "@/src/components/Partner/Main";

import { useMessageSuccess } from "@/src/hooks/message/success";
import { getApiPartner } from "@/src/api/partner/axios";
import { useAuthPartner } from "@/src/hooks/partner/auth";
import {useMessageError} from "@/src/hooks/message/error";

const NewUser = () => {
    const router = useRouter()
    const { user } = useAuthPartner("")

    const { message : messageSuccess, showMessage : showMessageSuccess } = useMessageSuccess()
    const { setMessageError } = useMessageError()

    const [ alertError, setAlertError] = useState<string|null>(null)
    const [ processing, setProcessing] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        type: 0,
        is_active : 1
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleFormSubmit = async (e: any) => {
        e.preventDefault()

        setProcessing(true)
        
        const api = getApiPartner("")

        api.post("/user/create", {
            ...formData,
            id_partner: user?.id_partner,
        })
        .then((response) => {
            showMessageSuccess(response?.data?.message)
            router.push("/partner/user")
        }).catch((e) => {
            let errorString = ""

            Object.keys(e?.response?.data?.errors).forEach((key) => {
                e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                    errorString += `${errorMessage}<br>`
                })
            })

            setMessageError(errorString)
        }).finally(() => {
            setProcessing(false)

            setTimeout(() => {
                setMessageError('')
            }, 10000)
        })
    }

    return (
        <Main>
            <div className="w-100% md:w-50% flex flex-col mb-45px">
                <Breadcrumb list={breadcrumb}/>
                <Title title={title} />
            </div>

            <form onSubmit={handleFormSubmit}
                  className="w-100% border-1 border-grey_six p-25px rounded-8px flex flex-wrap md:justify-between">
                <div className="md:w-1/4 md:flex-auto md:mr-5 w-100% mb-5">
                    <Label>Name</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                        type="text"
                        placeholder="User name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className="md:w-1/4 md:flex-auto md:mr-5 w-100% mb-5">
                    <Label>Email</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                        type="text"
                        placeholder="User email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className="md:w-1/6 md:flex-auto md:mr-5 w-100% mb-5">
                    <Label>Type user</Label>

                    <select
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                        name="type"
                        value={formData.type}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                </div>

                <div className="md:w-1/6 md:flex-auto md:mr-0 w-100% mb-5">
                    <Label>Status</Label>

                    <select
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                        name="is_active"
                        value={formData.is_active}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                </div>

                <div className="md:w-1/6 md:flex-auto md:mr-5 w-100% mb-5">
                    <Label>Password</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                        type="password"
                        placeholder="Type password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className="md:w-1/6 md:flex-auto md:mr-0 w-100% mb-5">
                    <Label>Confirm Password</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                        type="password"
                        placeholder="Type your password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className="w-100%">
                    <ButtonSmall bgColor="bg-yellow_one">
                        Create user
                        {processing && <Processing/>}
                    </ButtonSmall>
                </div>
            </form>
        </Main>
    )
}

export default NewUser;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {['partnerAuth.token']: token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/partner/login',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}