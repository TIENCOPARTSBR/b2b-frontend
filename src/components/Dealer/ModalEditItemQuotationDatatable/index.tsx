import React, { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useMessageSuccess } from "@/src/hooks/message/success"

import Processing from "@/src/components/Processing"
import {getApiDealer} from "@/src/api/dealer/axios";
import {parseCookies} from "nookies";
import {useMessageError} from "@/src/hooks/message/error";
import Label from "@/src/components/Label";

interface ModalProps {
    editTargetId: number
    handleOnVisible: () => void
    handleApiUpdate: string
    handleUpdateListing: () => void
}


const ModalEditItemQuotationDatatable = ({ editTargetId, handleOnVisible, handleApiUpdate, handleUpdateListing }: ModalProps) => {
    const router = useRouter()
    const {['dealerAuth.id_dealer']: id_dealer} = parseCookies();
    const id_quotation = router?.query?.edit;

    const { showMessage } = useMessageSuccess()
    const { setMessageError } = useMessageError()
    const [ processing, setProcessing] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        id : editTargetId,
        id_quotation : id_quotation,
        id_dealer : id_dealer,
        part_number: "",
        application: "",
        observation: "",
        description: "",
        quantity: "",
        moq: ""
    })

    useEffect(() => {
        const updateData = async () => {
            const api = getApiDealer('')
            await api.post('/quotation/item/unique', {
                id_quotation: id_quotation,
                id_dealer: id_dealer,
                id: editTargetId
            })
                .then((response) => {
                    setFormData((prevData) => ({
                        ...prevData,
                        part_number: response?.data?.data?.part_number,
                        application: response?.data?.data?.application,
                        observation: response?.data?.data?.observation,
                        description: response?.data?.data?.description,
                        quantity: response?.data?.data?.quantity,
                        moq: response?.data?.data?.moq,
                    }))
                })
        }
        updateData()
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleEditItem = (e: any) => {
        e.preventDefault()

        const api = getApiDealer('')
        api.put(handleApiUpdate,formData)
            .then((response) => {
                showMessage(response?.data?.message)
                handleUpdateListing()
                handleOnVisible()
            }).catch((e) => {
                console.error(e)
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
        <div className={`w-100% h-100% top-0 left-0 fixed z-10 flex items-center justify-center animate-opacity-in`}>
                <div className={`w-screen h-screen absolute top-0 left-0 bg-black opacity-60 z-20`}></div>
                <div className={`w-auto lg:w-1/3 h-auto p-25px z-30 bg-white flex flex-wrap items-start animate-show-in`}>
                    <div className="w-100% mb-5">
                        <Label>Part number</Label>

                        <input type="text"
                               name="part_number"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px text-grey_seven font-inter font-normal outline-yellow_two"
                               value={formData.part_number}
                               onChange={handleInputChange}
                               disabled={true}
                               readOnly={true}
                        />
                    </div>

                    <div className="w-100% mb-5">
                        <Label>Quantity</Label>

                        <input type="number"
                               name="quantity"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px text-grey_seven font-inter font-normal outline-yellow_two"
                               value={formData.quantity}
                               onChange={handleInputChange}
                               required={true}
                        />
                    </div>

                    <div className="w-100% mb-5">
                        <Label>Description</Label>

                        <input type="text"
                               name="description"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px text-grey_seven font-inter font-normal outline-yellow_two"
                               value={formData.description}
                               onChange={handleInputChange}
                               required={true}
                        />
                    </div>

                    <div className="w-100% mb-5">
                        <Label>Application</Label>

                        <select
                            className="w-100% border-1 border-grey_six rounded-8px py-9px px-12px text-14px text-grey_seven font-inter font-normal outline-yellow_two"
                            name="application"
                            value={formData.application}
                            onChange={handleSelectChange}
                            required={true}
                        >
                            <option value="CAT">CAT</option>
                            <option value="OTHERS">OTHERS</option>
                        </select>
                    </div>

                    <div className="w-100% mb-5">
                        <Label>Observation</Label>

                        <input type="text"
                               name="observation"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px text-grey_seven font-inter font-normal outline-yellow_two"
                               value={formData.observation}
                               onChange={handleInputChange}
                               required={true}
                        />
                    </div>

                    <div className={`flex items-center justify-end mt-5`}>
                        <button
                            className={`px-15px py-9px rounded-60px border-1 border-grey_seven text-black_two text-14px font-medium mr-4`}
                            onClick={handleOnVisible}>
                            Cancel
                        </button>

                        <button
                            className={`px-15px py-9px rounded-60px bg-yellow_one text-black text-14px font-medium shadow-shadow_btn_small flex items-center`}
                            onClick={handleEditItem}>
                            Update {processing && <Processing/>}
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default ModalEditItemQuotationDatatable;