import Image from "next/image"
import { useState } from "react"
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

import { getApiDealer } from "@/src/api/dealer/axios"
import { useMessageSuccess } from "@/src/hooks/message/success"

import AlertError from "@/src/components/AlertError"
import Processing from "@/src/components/Processing"

interface ModalProps {
    deleteTargetId: number
    handleOnVisible: () => void
    handleApiDelete: string
    handleUpdateListing: () => void
}

const ModalDeleteDatatable = ({ deleteTargetId, handleOnVisible, handleApiDelete, handleUpdateListing }: ModalProps) => {
    const router = useRouter()

    const {['dealerAuth.id_dealer']: id_dealer} = parseCookies();

    const { message : messageSuccess, showMessage : showMessageSuccess } = useMessageSuccess()
    const [alertError, setAlertError] = useState<string|null>(null)
    const [processing, setProcessing] = useState<boolean>(false)

    const handleDelete = (e: any) => {
        e.preventDefault()
        setProcessing(true)

        const api = getApiDealer('')
        api.post(handleApiDelete, {
            id: deleteTargetId,
            id_quotation : router?.query?.edit,
            id_dealer : id_dealer,
        })
        .then((response) => {
            showMessageSuccess(response?.data?.message)
            handleOnVisible()
            handleUpdateListing()
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
        <>
            { alertError && <AlertError text={alertError} /> }

            <div className={`w-100% h-100% top-0 left-0 fixed z-10 flex items-center justify-center animate-opacity-in`}>
                    <div className={`w-screen h-screen absolute top-0 left-0 bg-black opacity-60 z-20`}></div>
                    <div className={`w-auto h-auto p-25px z-30 bg-white flex flex-wrap items-start animate-show-in`}>
                        <Image
                            width={24}
                            height={24}
                            src={`/icon/icon-alert-modal.svg`}
                            alt={`Icon alert modal`}
                            className={`mr-3`}
                        />
                        <div>
                            <h2 className={`w-100% md:w-350px text-black text-13px font-semibold mb-2`}>
                                Modal delete
                            </h2>

                            <p className={`w-100% text-black_two text-13px font-normal`}>
                                Are you sure you want to delete?
                            </p>

                            <div className={`flex items-center justify-end mt-5`}>
                                <button
                                    className={`px-15px py-9px rounded-60px border-1 border-grey_seven text-black_two text-13px font-medium mr-2`}
                                    onClick={handleOnVisible}>
                                    Cancel
                                </button>

                                <button
                                    className={`px-15px py-9px rounded-60px bg-yellow_one text-grey_one text-13px font-semibold shadow-shadow_btn_small flex items-center`}
                                    onClick={handleDelete}>
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

export default ModalDeleteDatatable;