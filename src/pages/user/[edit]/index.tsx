import { useState }  from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

import {
    breadcrumb,
    title
} from "@/src/utils/constants/Dealer/User/Edit/util";
import { useMessageSuccess } from "@/src/hooks/message/success";
import { getApiDealer } from "@/src/api/dealer/axios";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Label from "@/src/components/Label";
import ButtonSmall from "@/src/components/ButtonSmall";
import AlertError from "@/src/components/AlertError";
import AlertSuccess from "@/src/components/AlertSuccess";
import Processing from "@/src/components/Processing";

type UserType = {
    id: number,
    type: string,
    name: string,
    email: string,
    password: string,
    id_dealer: number,
    is_active: number
}

interface UserProps {
    data: UserType
}

const UpdateUser = (data: UserProps) => {
    const router = useRouter()

    const { message : messageSuccess, showMessage : showMessageSuccess } = useMessageSuccess()

    const [ processing, setProcessing] = useState<boolean>(false)
    const [ alertError, setAlertError] = useState<string|null>(null)

    const [formData, setFormData] = useState({
        id: data?.data?.id,
        name: data?.data?.name,
        email: data?.data?.email,
        type: data?.data?.type,
        is_active: data?.data?.is_active,
        password: undefined,
        password_confirmation: undefined,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault()

        setProcessing(true)

        if (formData.password === undefined) {
            delete formData.password
            delete formData.password_confirmation
        }

        const api = getApiDealer("")
        api.put("/user/update", formData)
        .then((response) => {
            showMessageSuccess(response?.data?.message)
            router.push('/user')
        }).catch((e) => {
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

    return (
        <Main>
            { messageSuccess && <AlertSuccess text={ messageSuccess } /> }
            { alertError && <AlertError text={ alertError } /> }

            <div className="w-100% md:w-50% flex flex-col mb-45px">
                <Breadcrumb list={ breadcrumb }/>
                <Title title={ title } />
            </div>

            <form onSubmit={handleFormSubmit}
                  className="w-100% border-1 border-grey_six p-25px rounded-8px flex flex-wrap md:justify-between">
                <div className="md:w-1/4 md:mr-5 flex-auto w-100% mb-5">
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

                <div className="md:w-1/4 md:mr-5 flex-auto w-100% mb-5">
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

                <div className="md:w-1/6 md:mr-5 flex-auto w-100% mb-5">
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

                <div className="md:w-1/6 flex-auto w-100% mb-5">
                    <Label>Status</Label>

                    <select
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        name="is_active"
                        value={formData.is_active}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                    </select>
                </div>

                <div className="md:w-1/6 mr-5 flex-auto w-100% mb-5">
                    <Label>Password</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        type="password"
                        placeholder="Type your password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="md:w-1/6 flex-auto w-100% mb-5">
                    <Label>Confirm Password</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        type="password"
                        placeholder="Type your password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="w-100% md:mt-2">
                    <ButtonSmall bgColor="bg-yellow_one">
                        Update user
                        {processing && <Processing/>}
                    </ButtonSmall>
                </div>
            </form>
        </Main>
    )
}

export default UpdateUser;

export const getServerSideProps: GetServerSideProps<UserProps> = async (ctx) => {
    const {['dealerAuth.token']: token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    try {
        const api = getApiDealer(ctx)
        const response = await api.post('/user/unique/', {
            id_user: ctx?.params?.edit
        })
        const data = response?.data?.data || []

        return {
            props: {
                data: data
            }
        }
    } catch (error) {
        return {
            props: {
                data: []
            }
        }
    }
}