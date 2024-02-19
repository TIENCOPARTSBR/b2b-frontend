import React, { useState } from "react";
import { getApiDealer } from "@/src/api/dealer/axios";
import { useRouter } from "next/router";
import AlertError from "@/src/components/AlertError";
import {useMessageError} from "@/src/hooks/message/error";
import {useMessageSuccess} from "@/src/hooks/message/success";
import AlertSuccess from "@/src/components/AlertSuccess";
import Processing from "@/src/components/Processing";
import Image from "next/image";

interface PropsExcel {
    handleOnVisible: () => void;
    onUpdateListing: () => void
}

const Excel = ({ handleOnVisible, onUpdateListing } : PropsExcel) => {
    const router = useRouter()

    const { messageError, setMessageError } = useMessageError()
    const { message, showMessage } = useMessageSuccess()
    const [ processing, setProcessing ] = useState<boolean>(false)

    const [ file, setFile] = useState<File | null>(null);
    const [ columnOne, setColumnOne] = useState<string>('');
    const [ columnTwo, setColumnTwo] = useState<string>('');

    const handleInputPnsExcel = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setProcessing(true);

        const formData = new FormData();
        if (file) {
            formData.append('excel', file);
        }

        if (columnOne) {
            formData.append('partnumber', columnOne);
        }

        if (columnTwo) {
            formData.append('quantity', columnTwo);
        }

        if (router?.query?.edit) {
            formData.append('id_quotation', router.query.edit.toString());
        }

        const api = getApiDealer('')
        api.post('/quotation/item/excel', formData)
            .then((response) => {
                handleOnVisible()
                showMessage(response?.data?.message)
                onUpdateListing()
            })
            .catch((e) => {
                let errorString = ""

                Object.keys(e?.response?.data?.errors).forEach((key) => {
                    e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                        errorString += `${errorMessage}<br>`
                    })
                })

                setMessageError(errorString)
            })
            .finally(() => {
                setProcessing(false);

                setTimeout(() => {
                    setMessageError('')
                }, 10000)
            })
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            setFile(fileList[0]);
        }
    };

    const handleFileRemove = () => {
        setFile(null);
        const inputElement = document.getElementById('fileInput') as HTMLInputElement;
        if (inputElement) {
            inputElement.value = '';
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const fileList = event.dataTransfer.files;
        if (fileList && fileList.length > 0) {
            setFile(fileList[0]);
        }
    };

    return (
        <div className={`w-100% h-100% top-0 left-0 fixed z-10 flex items-center justify-center animate-opacity-in`}>
            { messageError && <AlertError text={messageError} /> }
            { message && <AlertSuccess text={message} /> }

            <div className={`w-screen h-screen absolute top-0 left-0 bg-black opacity-60 z-20`} onClick={handleOnVisible}></div>

            <form onSubmit={handleInputPnsExcel}
                  className={`w-auto h-auto p-45px z-30 bg-white flex flex-wrap items-center justify-center animate-show-in rounded-12px flex-col`}>
                <div className="w-100% mb-25px relative">
                    <input
                        id="fileInput"
                        type="file"
                        className="w-full h-full absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    />
                    <div
                        className="w-full h-full px-2rem md:px-8rem py-2rem border-2 rounded-8px bg-grey_ten border-grey_one p-4 flex flex-col items-center justify-center">
                        <Image src="/icon/icon-drag-file.svg" alt="alt" width="48" height="48" className="mb-25px"/>
                        <p className="text-black_one font-inter font-normal text-center text-16px">
                            Click or drag file to this area to upload <br />
                            This uploader only accepts <strong>.xls</strong> and <strong>.xlsx</strong> extensions
                        </p>
                    </div>
                </div>

                {file && (
                    <div className="w-100% flex justify-center items-center mb-20px text-center">
                        <p className="text-black mr-2">{file.name}</p>
                        <button
                            type="button"
                            className="text-red-600 hover:text-red-800"
                            onClick={handleFileRemove} >
                            Remover
                        </button>
                    </div>
                )}

                <p className="w-auto font-inter text-16px text-red_one text-center font-normal">
                    <strong>Important:</strong> Do not upload more than 500 parts.
                </p>

                <div className="w-auto flex justify-center text-center mt-35px">
                    <div className="flex flex-nowrap items-center mr-50px">
                        <p className="font-inter text-14px font-normal text-black_three mr-3">Part number column:</p>
                        <input
                            className="w-50px h-40px text-center border-1 border-grey_six rounded-8px py-8px px-12px text-14px font-inter font-normal outline-yellow_two text-black placeholder:text-grey_seven"
                            placeholder="A"
                            maxLength={1}
                            value={columnOne}
                            onChange={(event) => setColumnOne(event.target.value.toUpperCase())}
                        />
                    </div>

                    <div className="flex flex-nowrap items-center">
                        <p className="font-inter text-14px font-normal text-black_three mr-3">Quantity column:</p>
                        <input
                            className="w-50px h-40px text-center border-1 border-grey_six rounded-8px py-8px px-12px text-14px font-inter font-normal outline-yellow_two text-black placeholder:text-grey_seven"
                            placeholder="B"
                            maxLength={1}
                            value={columnTwo}
                            onChange={(event) => setColumnTwo(event.target.value.toUpperCase())}
                        />
                    </div>
                </div>

                <div className="w-100% flex justify-center mt-40px">
                    <button type="submit"
                            className="px-20px py-12px rounded-60px bg-yellow_one text-white flex flex-nowrap text-14px font-semibold font-inter">
                        Submit file
                        {processing && <Processing/>}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Excel;