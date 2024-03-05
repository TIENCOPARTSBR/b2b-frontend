import Image from "next/image"
import { useState } from "react"
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

import {getApiDealer} from "@/src/api/dealer/axios"

import AlertError from "@/src/components/AlertError"
import Processing from "@/src/components/Processing"
import { useMessageSuccess } from "@/src/hooks/message/success"

interface ModalProps {
    handleOnVisible: () => void
}

const ModalRetrieveFromQuotation = ({ handleOnVisible }: ModalProps) => {
    const { ['dealerAuth.id_dealer'] : id_dealer} = parseCookies();

    const router = useRouter()

    const { showMessage : showMessageSuccess } = useMessageSuccess()
    const [ alertError, setAlertError] = useState<string|null>(null)
    const [ processing, setProcessing] = useState<boolean>(false)

    const handleCreateSalesOrderFromQuotation = (e: any) => {
        e.preventDefault()

        setProcessing(true)

        const api = getApiDealer('')
            api.post('', {

            })
                .then((response) => {
                    router.reload()
                    handleOnVisible()
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
                }).finally(() => {
                    setProcessing(false)

                    setTimeout(() => {
                        setAlertError(null)
                    }, 10000)
                })
    }

    return (
        <div className={`w-100% h-100% top-0 left-0 fixed z-10 flex items-center justify-center animate-opacity-in`}>
            { alertError && <AlertError text={alertError} /> }
            <div className={`w-screen h-screen absolute top-0 left-0 bg-black opacity-60 z-20`}></div>

            <div className={`w-auto h-auto rounded-8px p-25px z-30 bg-white flex flex-wrap items-start animate-show-in`}>
                <div className="w-100% flex items-center justify-center">
                    <p className={`text-black_two text-14px font-normal font-inter mr-4`}>
                        Select your quotation:
                    </p>

                    <select className="border-1 border-grey_six rounded-8px py-15px px-18px select-all text-14px text-black_three font-inter font-normal outline-yellow_two" name="id_quotation" required={true}>
                        <option value="0">125 -Cerrejón - CRJ0193480AT</option>
                    </select>
                </div>

                <div className={`w-100% flex items-center justify-center mt-2rem`}>
                    <button
                        className={`px-18px py-12px rounded-60px bg-yellow_one text-black text-14px font-semibold shadow-shadow_btn_small flex items-center`} onClick={handleCreateSalesOrderFromQuotation}>
                        Generate P.O.
                        { processing && <Processing/> }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalRetrieveFromQuotation;