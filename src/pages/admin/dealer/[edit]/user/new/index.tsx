import React, { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import {
    title
} from "@/src/utils/constants/Admin/User/New/util";
import { useMessageSuccess } from "@/src/hooks/message/success";
import { getApiAdmin } from "@/src/api/adm/axios";

import Main from "@/src/components/Admin/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Label from "@/src/components/Label";
import ButtonSmall from "@/src/components/ButtonSmall";
import AlertError from "@/src/components/AlertError";
import Processing from "@/src/components/Processing";

type Dealer = {
    id: number
    name: string
}

interface UserProps {
    dealer: Dealer
}

const NewUser = ({ dealer } : UserProps) => {
    const router = useRouter()

    const { message : messageSuccess, showMessage : showMessageSuccess } = useMessageSuccess()

    const [ alertError, setAlertError] = useState<string|null>(null)
    const [ processing, setProcessing] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        type: 1,
        is_active: 1,
        id_dealer: dealer?.id
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
        console.log(formData)
        e.preventDefault()

        setProcessing(true)
        
        const api = getApiAdmin("")

        api.post("/dealer/user/create", {...formData})
            .then((response: any) => {
                showMessageSuccess(response?.data?.message)
                router.back()
            }).catch((e: any) => {
                let errorString = ""

                Object.keys(e?.response?.data?.errors).forEach((key) => {
                    e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                        errorString += `${errorMessage}<br>`
                    })
                })

                setAlertError(errorString)
            }).finally(() => {
                setProcessing(false)
                setTimeout(() => {
                    setAlertError(null)
                }, 10000)
            })
    }

    const breadcrumb = [
        {
            name: "Home",
            link: "/admin",
        },
        {
            name: "Dealer",
            link: "/admin/dealer",
        },
        {
            name: `${dealer?.name}`,
            link: `/admin/dealer/${dealer?.id}`,
        },
        {
            name: "Users",
            link: `/admin/dealer/${dealer?.id}/user`,
        }
    ]

    return (
        <Main>
            { alertError && <AlertError text={ alertError } /> }

            <div className="w-100% md:w-50% flex flex-col mb-45px">
                <Breadcrumb list={breadcrumb}/>
                <Title title={title} />
            </div>

            <form onSubmit={handleFormSubmit}
                  className="w-100% border-1 border-grey_six p-25px rounded-8px flex flex-wrap md:justify-between">
                <div className="md:w-1/3 md:mr-5 flex-auto w-100% mb-5">
                    <Label>Name</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        type="text"
                        placeholder="User name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className="md:w-1/5 md:mr-5 flex-auto w-100% mb-5">
                    <Label>Email</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        type="text"
                        placeholder="User email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className="md:w-1/5 md:mr-5 flex-auto w-100% mb-5">
                    <Label>Type user</Label>

                    <select
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        name="type"
                        value={formData.type}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                </div>

                <div className="md:w-1/5 md:mr-5 flex-auto w-100% mb-5">
                    <Label>Status</Label>

                    <select
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        name="is_active"
                        value={formData.is_active}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value={1} selected={formData.is_active === 1} >Active</option>
                        <option value={0} selected={formData.is_active === 0} >Inactive</option>
                    </select>
                </div>

                <div className="md:w-1/6 md:mr-5 flex-auto w-100% mb-5">
                    <Label>Password</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        type="password"
                        placeholder="Type password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className="md:w-1/6 md:mr-5 flex-auto w-100% mb-5">
                    <Label>Confirm Password</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
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


export const getServerSideProps: GetServerSideProps<UserProps> = async (ctx) => {
    const { ["adminAuth.token"] : token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            }
        }
    }

    try {
        const api = getApiAdmin(ctx);
        const dealer = await api.post('/dealer/',{ id: ctx?.params?.edit });

        return {
            props: {
                dealer: dealer?.data?.data
            }
        }
    } catch (e) {
        return {
            props: {
                dealer: []
            }
        }
    }
}