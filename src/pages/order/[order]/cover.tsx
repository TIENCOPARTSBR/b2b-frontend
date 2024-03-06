import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {useMessageSuccess} from "@/src/hooks/message/success";
import {getApiDealer} from "@/src/api/dealer/axios";
import {useMessageError} from "@/src/hooks/message/error";

import Label from "@/src/components/Label";

type OrderType = {
    id: number
    client_name: string
    client_order_number: string
    requested_by: string
    urgent: boolean
    deadline: string
    type: string
    status: string
    id_dealer: number
    payment_method: string
}

interface OrderInterface {
    order: OrderType
}

const Cover = ({ order } : OrderInterface) => {
    const router = useRouter();
    const { showMessage } = useMessageSuccess();
    const { setMessageError  } = useMessageError();

    const [formData, setFormData] = useState({
        id_dealer: order?.id_dealer,
        client_name: order?.client_name,
        client_order_number: order?.client_order_number,
        urgent: order?.urgent,
        deadline: order?.deadline,
        type: order?.type,
        status: order?.status,
        payment_method: order?.payment_method,
    });

    useEffect(() => {
        setFormData(formData)
        handleChange().then();
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handeRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked  } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
    };

    const requestData = {
        // Condicionalmente adiciona as chaves e valores ao objeto, dependendo do valor de order?.status
        ...({ id: router?.query?.order }),
        ...(order?.status == '0' && { client_name: formData?.client_name }),
        ...({ client_order_number: formData?.client_order_number }),
        ...({ payment_method: formData?.payment_method }),
        ...(order?.status == '0' && { urgent: formData?.urgent }),
        ...(order?.status == '0' && { deadline: formData?.deadline }),
        ...(order?.status == '0' && { type: formData?.type }),
        ...(order?.status == '0' && { status: formData?.status }),
        ...(order?.status == '0' && { id_dealer: formData?.id_dealer }),
    };

    const handleChange = async () => {
        const api = getApiDealer("")
        api.put('/salesOrder/update/', requestData)
        .catch((e) => {
            console.log(e);
            let errorString = ""
            Object.keys(e?.response?.data?.errors).forEach((key) => {
                e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                    errorString += `${errorMessage}<br>`
                })
            })
            setMessageError(errorString)
        })
    }

    return (
        <form>
            <div className="flex flex-wrap p-35px mt-35px rounded-8px border-1 border-grey_six mb-35px">
                <div className="w-full md:w-1/6 md:pr-5 mb-5">
                    <Label>Client name</Label>
                    <input type="text"
                           name="client_name"
                           placeholder="Insert cliente name"
                           className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px font-inter font-normal outline-yellow_two text-black placeholder:text-grey_seven"
                           value={formData.client_name}
                           onChange={handleInputChange}
                           required={true}
                           disabled={formData.status > '0'}
                           readOnly={formData.status > '0'}
                    />
                </div>
                <div className="w-full md:w-1/6 md:pr-5 mb-5">
                    <Label>Client order number</Label>
                    <input type="text"
                           name="client_order_number"
                           placeholder="Insert cliente order number"
                           className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px text-black placeholder:text-grey_seven font-inter font-normal outline-yellow_two"
                           value={formData.client_order_number}
                           onChange={handleInputChange}
                           disabled={formData.status > '2'}
                           readOnly={formData.status > '2'}
                    />
                </div>
                <div className="w-full md:w-1/6 md:pr-5 mb-5">
                    <Label>Method Payment</Label>
                    <input type="text"
                           name="payment_method"
                           placeholder="30 Days"
                           className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px text-black placeholder:text-grey_seven font-inter font-normal outline-yellow_two"
                           value={formData.payment_method}
                           onChange={handleInputChange}
                           disabled={formData.status > '2'}
                           readOnly={formData.status > '2'}
                    />
                </div>
                <div className="w-auto md:pr-5 mb-5 md:mb-0">
                    <Label>Urgent?</Label>
                    <div>
                        <label htmlFor="toggle" className="flex items-center cursor-pointer">
                            <input type="checkbox"
                                   id="toggle"
                                   className="sr-only peer"
                                   name="urgent"
                                   checked={formData.urgent}
                                   onChange={handeRadioChange}
                                   disabled={formData.status > '0'}
                                   readOnly={formData.status > '0'}
                            />
                            <div
                                className="block relative bg-grey_eight w-60px h-32px p-1 rounded-full before:absolute before:bg-white before:w-6 before:h-6 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:before:bg-white peer-checked:bg-red_one"></div>
                        </label>
                    </div>
                </div>
                <div className="flex-auto w-full md:w-1/6 md:pr-5 mb-5 md:mb-0">
                    <Label>Deadline</Label>
                    <input
                        type="datetime-local"
                        name="deadline"
                        className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px text-black placeholder:text-grey_seven font-inter font-normal outline-yellow_two"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        required={true}
                        disabled={formData.status > '0'}
                        readOnly={formData.status > '0'}
                    />
                </div>
                <div className="flex-auto w-full md:w-1/6 mb-5 md:mb-0">
                    <Label>Type</Label>
                    <select
                        className="w-100% border-1 border-grey_six rounded-8px py-9px px-12px text-14px text-black placeholder:text-grey_seven font-inter font-normal outline-yellow_two"
                        name="type"
                        value={formData.type}
                        onChange={handleSelectChange}
                        required={true}
                        disabled={formData.status > '0'}
                    >
                        <option value="1">Spot</option>
                        <option value="0">Template</option>
                    </select>
                </div>
            </div>
        </form>
    )
}

export default Cover;