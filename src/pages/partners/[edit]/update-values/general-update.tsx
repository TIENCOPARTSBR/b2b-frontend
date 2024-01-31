import { useState } from "react";
import { getApiDealer } from "@/src/api/dealer/axios";

import Processing from "@/src/components/Processing";
import AlertError from "@/src/components/AlertError";
import AlertSuccess from "@/src/components/AlertSuccess";
import {useMessageSuccess} from "@/src/hooks/message/success";

interface PropsInterface {
    partnerId: number
    generalType: string
    generalValue: string
}

const GeneralUpdate = ({ partnerId, generalType, generalValue }: PropsInterface) => {
    const { message: messageSuccess, showMessage : showMessageSuccess } = useMessageSuccess()

    const [ alertError, setAlertError] = useState<string|null>(null)
    const [ processing, setProcessing] = useState<boolean>(false)

    const [ generalUpdateType, setGeneralUpdateType] = useState<string>(generalType || '0')
    const [ generalUpdateValue, setGeneralUpdateValue] = useState<string>(generalValue || '0')

    const handleFormGeneralAdditionalValue = (e: any) => {
        e.preventDefault()

        setProcessing(true)

        const api = getApiDealer('')
        api.put("/partner/general-additional-value", {
            id: partnerId,
            general_update_type: generalUpdateType,
            general_update_value: generalUpdateValue
        })
        .then((response) => {
            showMessageSuccess(response?.data?.message)
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
            }, 2500)
        })
    }

    return (
        <form onSubmit={handleFormGeneralAdditionalValue} className="flex items-center flex-wrap">
            { alertError && <AlertError text={ alertError } />}
            { messageSuccess && <AlertSuccess text={ messageSuccess } />}

            <div className="flex flex-col mr-5">
                <label className="text-14px font-inter font-normal text-black mb-2">Type:</label>
                <select
                    className="w-200px p-2 border-1 rounded-8px text-14px font-inter font-normal text-black focus:outline-yellow_two"
                    onChange={(e): void => {
                        setGeneralUpdateType(e.target.value)
                    }}>
                    <option value="0" selected={generalUpdateType === '0'}>Price</option>
                    <option value="1" selected={generalUpdateType === '1'}>Percentual</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-14px font-inter font-normal text-black mb-2">Value:</label>
                <div
                    className={`relative ${(generalUpdateType === '0') ? 'before:content-["$"]' : 'before:content-["%"]'}  before:absolute text-grey_for before:left-10px before:top-7px`}>
                    <input
                        type="text"
                        value={generalUpdateValue}
                        className="w-100px p-2 border-1 rounded-8px text-14px font-inter font-normal text-black pl-7 focus:outline-yellow_two placeholder:text-black"
                        onChange={(e) => {
                            setGeneralUpdateValue(e.target.value)
                        }}
                    />
                </div>
            </div>

            <div className="w-100% mt-5 lg:mt-10">
                <button
                    className="px-18px py-10px bg-yellow_one rounded-60px text-14px font-medium font-inter text-black shadow-shadow_btn_small flex items-center">
                    Update
                    {processing && <Processing/>}
                </button>
            </div>
        </form>
    )
}

export default GeneralUpdate;