import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthDealer } from "@/src/hooks/dealer/auth";
import { getApiDealer } from "@/src/api/dealer/axios";

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
import AlertSuccess from "@/src/components/AlertSuccess";
import Processing from "@/src/components/Processing";
import {useMessageSuccess} from "@/src/hooks/message/success";

const NewPartner = () => {
    const router = useRouter()
    const { user} = useAuthDealer()

    const { message: messageSuccess, showMessage : showMessageSuccess } = useMessageSuccess()

    const [ alertError, setAlertError] = useState<string|null>(null)
    const [ processing, setProcessing] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        name: "",
        status: "1", // fica ativo por padrão
        id_dealer: user?.dealer_id
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

        console.error({...formData});

        const api = getApiDealer("")
        api.post("/partner/create", {...formData})
        .then((response) => {
            showMessageSuccess(response?.data?.message)
            router.push("/partners")
        }).catch((e) => {
            console.error(e)
            
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
            }, 2500)
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
                        name="status"
                        value={formData.status}
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