import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"

import {getApiDealer} from "@/src/api/dealer/axios"

import AlertError from "@/src/components/AlertError"
import AlertSuccess from "@/src/components/AlertSuccess"
import Processing from "@/src/components/Processing"
import { useMessageSuccess } from "@/src/hooks/message/success"

interface ModalProps {
    deleteTargetId: number
    handleOnVisible: () => void
    handleApiDelete: string
    handleUpdateListing?: () => void
}

const ModalDelete = ({ deleteTargetId, handleOnVisible, handleApiDelete, handleUpdateListing }: ModalProps) => {
    const router = useRouter()

    const { message : messageSuccess, showMessage : showMessageSuccess } = useMessageSuccess()

    const [alertError, setAlertError] = useState<string|null>(null)
    const [processing, setProcessing] = useState<boolean>(false)

    const handleDelete = (e: any) => {
        e.preventDefault()

        setProcessing(true)

        const api = getApiDealer('')
        api.post(handleApiDelete, {id: deleteTargetId})
        .then((response) => {
            showMessageSuccess(response?.data?.message)
            handleOnVisible()
            router.push(router.asPath)
            handleUpdateListing?.()
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
            }, 2500)
        })
    }

    return (
        <>
            { alertError && <AlertError text={alertError} /> }
            { messageSuccess && <AlertSuccess text={ messageSuccess } /> }

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
                            <h2 className={`w-100% md:w-350px text-black text-14px font-semibold mb-2`}>
                                Modal delete
                            </h2>

                            <p className={`w-100% text-black_two text-14px font-normal`}>
                                Are you sure you want to delete?
                            </p>

                            <div className={`flex items-center justify-end mt-5`}>
                                <button
                                    className={`px-15px py-9px rounded-60px border-1 border-grey_seven text-black_two text-14px font-medium mr-2`}
                                    onClick={handleOnVisible}>
                                    Cancel
                                </button>

                                <button
                                    className={`px-15px py-9px rounded-60px bg-yellow_one text-grey_one text-14px font-semibold shadow-shadow_btn_small flex items-center`}
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

export default ModalDelete