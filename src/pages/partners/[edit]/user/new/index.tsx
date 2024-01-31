import React, { useState } from "react";
import { useRouter } from "next/router";

import {useAuthDealer} from "@/src/hooks/dealer/auth";
import {getApiDealer} from "@/src/api/dealer/axios";

import {
    breadcrumb,
    title
} from "@/src/utils/constants/Dealer/User/New/util";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Label from "@/src/components/Label";
import ButtonSmall from "@/src/components/ButtonSmall";
import AlertError from "@/src/components/AlertError";
import Processing from "@/src/components/Processing";
import {useMessageSuccess} from "@/src/hooks/message/success";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";

type Partner = {
    id: number
    name: string
}

interface UserProps {
    partner: Partner|null
}

const NewUser = ({ partner } : UserProps) => {
    const router = useRouter()
    const { user } = useAuthDealer("")

    const { message: messageSuccess, showMessage: showMessageSuccess } = useMessageSuccess()
    const [ alertError, setAlertError] = useState<string|null>(null)
    const [ processing, setProcessing] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        type: "0"
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
        
        const api = getApiDealer("")

        api.post("/partner/user/create", {
            ...formData,
            id_partner: router?.query?.edit,
        })
        .then((response) => {
            finalyProcess()
            showMessageSuccess(response?.data?.message)
            router.push(`/partners/${router?.query?.edit}/user`)
        }).catch((e) => {
            let errorString = ""

            Object.keys(e?.response?.data?.errors).forEach((key) => {
                e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                    errorString += `${errorMessage}<br>`
                })
            })

            setAlertError(errorString)
        }).finally(() => {
            finalyProcess()
        })
    }

    const finalyProcess = () => {
        setProcessing(false)
        setTimeout(() => {
            setAlertError(null)
        }, 2500)
    }

    const breadcrumb = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Partners",
            link: "/partners",
        },
        {
            name: `${partner?.name}`,
            link: `/partners/${partner?.id}/user`,
        },
        {
            name: "Users",
            link: `/partners/${partner?.id}/user`,
        }
    ]

    return (
        <Main>
            { alertError && <AlertError text={ alertError } /> }

            <div className="w-100% md:w-50% flex flex-col mb-45px">
                <Breadcrumb list={breadcrumb}/>
                <Title title={title} />
            </div>

            <form onSubmit={handleFormSubmit} className="w-100% border-1 border-grey_six p-25px rounded-8px flex flex-wrap md:justify-between">
                <div className="md:w-32.3% w-100% mb-5">
                    <Label>Name</Label>

                    <input className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                           type="text"
                           placeholder="User name"
                           name="name"
                           value={formData.name}
                           onChange={handleInputChange}
                           required={true}
                    />
                </div>

                <div className="md:w-32.3% w-100% mb-5">
                    <Label>Email</Label>

                    <input className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                           type="text"
                           placeholder="User email"
                           name="email"
                           value={formData.email}
                           onChange={handleInputChange}
                           required={true}
                    />
                </div>

                <div className="md:w-32.3% w-100% mb-5">
                    <Label>Type user</Label>

                    <select
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"   name="type"
                        value={formData.type}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                </div>

                <div className="md:w-49% w-100% mb-5">
                    <Label>Password</Label>

                    <input className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                           type="password"
                           placeholder="User email"
                           name="password"
                           value={formData.password}
                           onChange={handleInputChange}
                           required={true}
                    />
                </div>

                <div className="md:w-49% w-100% mb-5">
                    <Label>Confirm Password</Label>

                    <input className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
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
                        {processing && <Processing/> }
                    </ButtonSmall>
                </div>
            </form>
        </Main>
    )
}

export default NewUser;


export const getServerSideProps: GetServerSideProps<UserProps> = async (ctx) => {
    const { ["dealerAuth.token"] : token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }

    try {
        const api = getApiDealer(ctx);
        const partnerResponse = await api.get(`/partner/${ctx?.params?.edit}`);
        const partnerData = partnerResponse?.data?.data;

        return {
            props: {
                partner: partnerData,
            },
        };
    } catch (error) {
        return {
            props: {
                partner: null,
            },
        };
    }
}

