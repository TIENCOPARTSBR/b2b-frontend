import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
    breadcrumb,
    title
} from "@/src/utils/constants/Admin/Dealer/New/util";

import Main from "@/src/components/Admin/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Label from "@/src/components/Label";
import ButtonSmall from "@/src/components/ButtonSmall";
import AlertError from "@/src/components/AlertError";
import Processing from "@/src/components/Processing";

import { useMessageSuccess } from "@/src/hooks/message/success";
import {getApiAdmin} from "@/src/api/adm/axios";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";

const NewDealer = () => {
    const router = useRouter()

    const { message: messageSuccess, showMessage : showMessageSuccess } = useMessageSuccess()
    const [ alertError, setAlertError] = useState<string|null>(null)
    const [ processing, setProcessing] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        name: undefined,
        is_active: 1,
        type_of_access: 0,
        allow_quotation: 0,
        allow_partner: 0,
        sisrev_llc_code: undefined,
        sisrev_br_code: undefined,
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
        setAlertError(null)

        console.error({...formData});

        const api = getApiAdmin("")
        api.post("/dealer/create", {...formData})
        .then((response) => {
            showMessageSuccess(response?.data?.message)
            router.push("/admin/dealer")
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

            <form onSubmit={handleFormSubmit}
                  className="w-100% border-1 border-grey_six p-25px rounded-8px flex flex-wrap md:justify-between">
                <div className="md:w-1/4 w-100% flex-auto mb-5 mr-5">
                    <Label>Name</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className="md:w-1/4 w-100% flex-auto mb-5 mr-5">
                    <Label>Status</Label>

                    <select
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        name="is_active"
                        value={formData.is_active}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value="1">Ativo</option>
                        <option value="0"> Inativo</option>
                    </select>
                </div>


                <div className="md:w-1/4 w-100% flex-auto mb-5 mr-5">
                    <Label>Type of access</Label>

                    <select
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        name="type_of_access"
                        value={formData.type_of_access}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value="0">B2B Portal</option>
                        <option value="1">API</option>
                    </select>
                </div>

                <div className="md:w-1/4 w-100% mb-5 mr-5">
                    <Label>Allow to quotation?</Label>

                    <select
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        name="allow_quotation"
                        value={formData.allow_quotation}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div className="md:w-1/6 w-100% flex-auto mb-5 mr-5">
                    <Label>Allow to partner?</Label>

                    <select
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        name="allow_partner"
                        value={formData.allow_partner}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div className="md:w-1/6 w-100% flex-auto mb-5 mr-5">
                    <Label>Code Sisrev Brazil</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        type="text"
                        placeholder="5432"
                        name="sisrev_br_code"
                        value={formData.sisrev_br_code}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className="md:w-1/6 w-100% flex-auto mb-5 mr-5">
                    <Label>Code Sisrev LLC</Label>

                    <input
                        className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px"
                        type="text"
                        placeholder="1234"
                        name="sisrev_llc_code"
                        value={formData.sisrev_llc_code}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className="w-100%">
                    <ButtonSmall bgColor="bg-yellow_one">
                        Create Dealer
                        {processing && <Processing/>}
                    </ButtonSmall>
                </div>
            </form>
        </Main>
    )
}

export default NewDealer;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['adminAuth.token'] : token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            }
        }
    }

    return {
        props: {
        }
    }
}

