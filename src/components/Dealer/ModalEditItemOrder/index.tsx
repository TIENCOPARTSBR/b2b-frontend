import React, { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useMessageSuccess } from "@/src/hooks/message/success"

import Processing from "@/src/components/Processing"
import {getApiDealer} from "@/src/api/dealer/axios";
import {parseCookies} from "nookies";
import {useMessageError} from "@/src/hooks/message/error";
import Label from "@/src/components/Label";
import ErrorProcess from "@/src/utils/function/error";

interface ModalProps {
    editTargetId: number;
    handleOnVisible: () => void;
    handleApiUpdate: string;
    handleUpdateListing: () => void;
    status: string|undefined;
}

const ModalEditItemOrder = ({ editTargetId, handleOnVisible, handleApiUpdate, handleUpdateListing, status }: ModalProps) => {
    const api = getApiDealer('');
    const { showMessage } = useMessageSuccess();
    const { setMessageError } = useMessageError();
    const [ processing, setProcessing] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const [formData, setFormData] = useState({
        id : editTargetId,
        part_number: "",
        application: "",
        observation: "",
        description: "",
        quantity: "",
        moq: ""
    });

    useEffect(() => {
        const updateData = async () => {
            const api = getApiDealer('')
            await api.post('/order/item/unique', {
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
                    }));
                });
        }
        updateData().then();
    }, []);

    const handleEditItem = (e: any) => {
        e.preventDefault();

        console.log(formData);

        api.put(handleApiUpdate,formData)
            .then((response: any) => {
                showMessage(response?.data?.message)
                handleUpdateListing()
                handleOnVisible()
            }).catch((e: any) => {
                console.error(e);
                setMessageError(ErrorProcess(e));
            }).finally(() => {
                setProcessing(false);
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
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-13px text-grey_seven font-inter font-normal outline-yellow_two"
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
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-13px text-grey_seven font-inter font-normal outline-yellow_two"
                               value={formData.quantity}
                               onChange={handleInputChange}
                               required={true}
                        />
                    </div>

                    <div className="w-100% mb-5">
                        <Label>Description</Label>

                        <input type="text"
                               name="description"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-13px text-grey_seven font-inter font-normal outline-yellow_two"
                               value={formData.description}
                               onChange={handleInputChange}
                               required={true}
                               disabled={status != undefined && status > '0'}
                        />
                    </div>

                    <div className="w-100% mb-5">
                        <Label>Application</Label>

                        <select
                            className="w-100% border-1 border-grey_six rounded-8px py-9px px-12px text-13px text-grey_seven font-inter font-normal outline-yellow_two"
                            name="application"
                            value={formData.application}
                            onChange={handleSelectChange}
                            required={true}
                            disabled={status != undefined && status > '0'}
                        >
                            <option value="CAT">CAT</option>
                            <option value="OTHERS">OTHERS</option>
                        </select>
                    </div>

                    <div className="w-100% mb-5">
                        <Label>Observation</Label>

                        <input type="text"
                               name="observation"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-13px text-grey_seven font-inter font-normal outline-yellow_two"
                               value={formData.observation}
                               onChange={handleInputChange}
                               required={true}
                               disabled={status != undefined && status > '0'}
                        />
                    </div>

                    <div className={`flex items-center justify-end mt-5`}>
                        <button
                            className={`px-15px py-9px rounded-60px border-1 border-grey_seven text-black_two text-13px font-medium mr-4`}
                            onClick={handleOnVisible}>
                            Cancel
                        </button>

                        <button
                            className={`px-15px py-9px rounded-60px bg-yellow_one text-black text-13px font-medium shadow-shadow_btn_small flex items-center`}
                            onClick={handleEditItem}>
                            Update {processing && <Processing/>}
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default ModalEditItemOrder;