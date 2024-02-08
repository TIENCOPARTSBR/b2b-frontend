import React, { useState } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next";

import { getApiDealer } from "@/src/api/dealer/axios";
import { useMessageSuccess } from "@/src/hooks/message/success";
import {
    breadcrumb,
    title
} from "@/src/utils/constants/Dealer/Partner/Edit/util";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Label from "@/src/components/Label";
import ButtonSmall from "@/src/components/ButtonSmall";
import AlertError from "@/src/components/AlertError";
import AlertSuccess from "@/src/components/AlertSuccess";
import Processing from "@/src/components/Processing";

type PartnerType = {
    id: number,
    name: string,
    is_active: number,
    id_dealer: number,
}

interface PartnerProps {
    partner: PartnerType
}

const EditPartner = ({ partner }: PartnerProps) => {
    const router = useRouter()

    const { message: messageSuccess, showMessage : showMessageSuccess } = useMessageSuccess()

    const [ alertError, setAlertError] = useState<string|null>(null)
    const [ processing, setProcessing] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        id_partner: partner?.id,
        id_dealer: partner?.id_dealer,
        name: partner?.name,
        is_active: partner?.is_active
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        setProcessing(true)

        const api = getApiDealer("")
        api.put("/partner/update/", {...formData})
        .then((response ) => {
            showMessageSuccess(response?.data?.message)
            router.push("/partners")
        })
        .catch((e) => {
            let errorString = ""

            Object.keys(e?.response?.data?.errors).forEach((key) => {
                e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                    errorString += `${errorMessage}<br>`
                })
            })

            setAlertError(errorString)
        })
        .finally(() => {
            setProcessing(false)
            setTimeout(() => {
                setAlertError(null)
            }, 10000)
        })
    }

    return (
        <Main>
            { alertError && <AlertError text={ alertError } /> }
            { messageSuccess && <AlertSuccess text={ messageSuccess } /> }

            <div className="w-100% md:w-50% flex flex-col mb-45px">
                <Breadcrumb list={ breadcrumb }/>
                <Title title={ title } />
            </div>

            <form onSubmit={handleSubmit} className="w-100% border-1 border-grey_six p-25px rounded-8px flex flex-wrap md:justify-between">
                <div className="md:w-49% w-100% mb-5">
                    <Label>Name</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className="md:w-49% w-100% mb-5">
                    <Label>Status</Label>

                    <select
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                        name="is_active"
                        value={formData.is_active}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value="1">Ativo</option>
                        <option value="0">Inativo</option>
                    </select>
                </div>

                <div className="w-100%">
                    <ButtonSmall bgColor="bg-yellow_one">
                        Update partner
                        { processing && <Processing/> }
                    </ButtonSmall>
                </div>
            </form>
        </Main>
    )
}
export default EditPartner;


export const getServerSideProps: GetServerSideProps<PartnerProps> = async (ctx) => {
    const {['dealerAuth.token']: token} = parseCookies(ctx);
    const {['dealerAuth.id_dealer']: id_dealer} = parseCookies(ctx);

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
        const response= await api.post('/partner/unique', {
            id_partner: ctx?.params?.edit,
            id_dealer: id_dealer
        });

        return {
            props: {
                partner: response?.data?.data || []
            }
        }
    } catch (error) {
        return {
            props: {
                partner: []
            }
        };
    }
}