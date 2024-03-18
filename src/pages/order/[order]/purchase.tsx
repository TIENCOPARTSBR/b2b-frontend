import React, { useState } from "react";
import { useRouter } from "next/router";

import Processing from "@/src/components/Processing";

import { useMessageSuccess } from "@/src/hooks/message/success";
import { useMessageError } from "@/src/hooks/message/error";
import { getApiDealer } from "@/src/api/dealer/axios";

type OrderType = {
    id: number
    id_dealer: number
    status: string
}

type OrderResumeType = {
    total_price: number
    total_weight: number
    total_items: number
}

interface PurchaseInterface {
    order: OrderType
    orderResume: OrderResumeType|any
}

const Purchase = ({ order, orderResume }: PurchaseInterface) => {
    const router = useRouter();
    const api = getApiDealer('');
    const { showMessage } = useMessageSuccess();
    const { setMessageError } = useMessageError();
    const [ loader, setLoader ] = useState<boolean>(false);

    const ROUTE_SEND_TO_SISREV: string = "/salesOrder/sendToSisrev";

    const formData: { id_dealer: number, id_sales_order: number } = {
        id_dealer: order?.id_dealer,
        id_sales_order: order?.id,
    }

    const handleRequestPurchase = () => {
        api.post(ROUTE_SEND_TO_SISREV, formData)
            .then((response) => {
                showMessage(response?.data?.message);
                router?.push('/order');
            }).catch((e) => {
                console.error(e);
                let errorString = ""

                Object.keys(e?.response?.data?.errors).forEach((key) => {
                    e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                        errorString += `${errorMessage}<br>`
                    })
                })

                setMessageError(errorString)
            }).finally(() => {
                setLoader(false)
            })
    }

    return (
        <div className={`mt-50px flex flex-wrap md:justify-between items-center ${order?.status == '3' ? 'w-auto' : 'w-fill'}`}>
            <h2 className="w-full mb-5 text-20px font-semibold font-inter text-black">Order Resume</h2>

            <div className={`flex p-35px rounded-8px border-1 border-grey_six flex-wrap ${order?.status == '3' ? 'flex-auto w-auto justify-between' : 'items-end w-full'}`}>
                <div className={`w-full md:w-1/4`}>
                    <h2 className="w-full mb-4 text-16px font-bold font-inter text-black">Total Cost</h2>
                    <p className="w-full mb-4 text-18px font-regular font-inter text-black">USD
                        $ {orderResume?.total_price ?? '---'}</p>
                </div>

                <div className={`w-full md:w-1/4`}>
                    <h2 className="w-full mb-4 text-16px font-bold font-inter text-black">Total Weight</h2>
                    <p className="w-full mb-4 text-18px font-regular font-inter text-black">{orderResume?.total_weight ?? '---'} KG</p>
                </div>

                <div className={`w-full md:w-1/4`}>
                    <h2 className="w-full mb-4 text-16px font-bold font-inter text-black">Total Items</h2>
                    <p className="w-full mb-4 text-18px font-regular font-inter text-black">{orderResume?.total_items ?? '---'}</p>
                </div>

                {order?.status == '2' && (
                    <div className="w-full md:w-1/4 flex justify-end">
                        <button onClick={handleRequestPurchase}
                                className="w-150px h-40px py-1 bg-green_one flex items-center justify-center rounded-60px">
                            Purchase {loader && <Processing/>}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Purchase;