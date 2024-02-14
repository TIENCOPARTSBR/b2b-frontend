import {getApiDealer} from "@/src/api/dealer/axios";
import {useState} from "react";
import {useRouter} from "next/router";
import AlertError from "@/src/components/AlertError";
import AlertSuccess from "@/src/components/AlertSuccess";
import Processing from "@/src/components/Processing";
import {useMessageSuccess} from "@/src/hooks/message/success";
import {useAuthPartner} from "@/src/hooks/partner/auth";

interface ModalProps {
    data: any;
    onShow: () => void;
    routeApi: string;
}
const ModalEditAdditionalValue = ({data, onShow, routeApi}: ModalProps) => {
    const router = useRouter()
    const { user } = useAuthPartner()

    const { message: messageSuccess, showMessage: showMessageSuccess } = useMessageSuccess()
    const [alertError, setAlertError] = useState<string|null>(null)
    const [processing, setProcessing] = useState<boolean>(false)

    const [partNumber, setPartNumber] = useState<string>(data?.partnumber)
    const [value, setValue] = useState<number>(parseInt(data?.value, 10))
    const [type, setType] = useState<number>(parseInt(data?.type, 10))

    const handleForm = (e: any) => {
        e.preventDefault()

        setProcessing(true)

        const api = getApiDealer('')
        api.put(routeApi, {
            id: data?.id,
            value: value,
            type: type,
            id_partner: user?.id_partner
        }).then((response) => {
            showMessageSuccess(response?.data?.message)
            router.push(router.asPath);
            onShow()
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
            }, 2500)
        })
    }

    return (
        <>
            { alertError && <AlertError text={alertError} /> }
            { messageSuccess && <AlertSuccess text={messageSuccess} /> }

            <div className={`w-100% h-100% top-0 left-0 fixed z-10 flex items-center justify-center animate-opacity-in`}>
                    <div className={`w-screen h-screen absolute top-0 left-0 bg-black opacity-60 z-20`}></div>
                    <div className={`w-auto h-auto p-25px z-30 bg-white flex flex-wrap items-start animate-show-in`}>
                        <div>
                            <h2 className={`w-100% md:w-350px text-black text-16px font-semibold mb-4`}>
                                Update value
                            </h2>

                            <div className={`flex flex-col`}>
                                <input type={`text`}
                                       className={`w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px mb-4`}
                                       placeholder={`part number`}
                                       value={partNumber}
                                       readOnly={true}
                                       onChange={(e) => {setPartNumber(e.target.value)}} />

                                <input type={`number`}
                                       className={`w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px mb-4`}
                                       placeholder={`0.00`}
                                       value={value}
                                       onChange={(e) => {setValue(parseInt(e.target.value, 10))}} />

                                <select
                                    className="w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-14px"
                                    value={type}
                                    onChange={(e) => {setType(parseInt(e.target.value, 10))}} >
                                    <option value="0">Unit price</option>
                                    <option value="1">Percentage</option>
                                </select>
                            </div>

                            <div className={`flex items-center justify-end mt-5`}>
                                <button
                                    className={`px-15px py-9px rounded-60px border-1 border-grey_seven text-black_two text-14px font-medium mr-2`}
                                    onClick={onShow}>
                                    Cancel
                                </button>

                                <button
                                    className={`px-15px py-9px rounded-60px bg-yellow_one text-white text-14px font-semibold shadow-shadow_btn_small flex items-center`}
                                    onClick={handleForm} >
                                    Confirm
                                    { processing && <Processing/> }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default ModalEditAdditionalValue;