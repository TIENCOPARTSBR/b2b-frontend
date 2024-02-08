import React, { useState } from "react";
import { useRouter } from "next/router";

import { useAuthDealer } from "@/src/hooks/dealer/auth";
import { getApiDealer } from "@/src/api/dealer/axios";
import { useMessageSuccess } from "@/src/hooks/message/success";

import {
    breadcrumb,
    title
} from "@/src/utils/constants/Dealer/Partner/New/util";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Label from "@/src/components/Label";
import ButtonSmall from "@/src/components/ButtonSmall";
import AlertError from "@/src/components/AlertError";
import Processing from "@/src/components/Processing";
import { GetServerSideProps } from "next";
import {parseCookies} from "nookies";

const NewPartner = () => {
    const router = useRouter()

    const {['dealerAuth.id_dealer']: id_dealer} = parseCookies();

    const { showMessage : showMessageSuccess } = useMessageSuccess()
    const [ alertError, setAlertError] = useState<string|null>(null)
    const [ processing, setProcessing] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        name: "",
        is_active: 1,
        id_dealer: id_dealer
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleFormSubmit = (e: any) => {
        e.preventDefault()
        
        setProcessing(true)

        const api = getApiDealer("")
        api.post("/partner/create", {
            id_dealer: formData?.id_dealer,
            is_active: formData?.is_active,
            name: formData?.name
        })
            .then((response) => {
                showMessageSuccess(response?.data?.message)
                router.push("/partners")
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
            { alertError && <AlertError text={ alertError } /> }

            <div className="w-100% md:w-50% flex flex-col mb-45px">
                <Breadcrumb list={ breadcrumb }/>
                <Title title={ title } />
            </div>

            <form onSubmit={handleFormSubmit} className="w-100% border-1 border-grey_six p-25px rounded-8px flex flex-wrap md:justify-between">
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
                        Create Partner
                        { processing && <Processing/> }
                    </ButtonSmall>
                </div>
            </form>
        </Main>
    )
}

export default NewPartner;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['dealerAuth.token']: token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}