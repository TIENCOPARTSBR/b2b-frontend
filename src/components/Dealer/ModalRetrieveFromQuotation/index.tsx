import React, {useState, ChangeEvent, useEffect} from "react"
import Select from 'react-select';
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import {getApiDealer} from "@/src/api/dealer/axios"

import Processing from "@/src/components/Processing"
import { useMessageSuccess } from "@/src/hooks/message/success"
import {useMessageError} from "@/src/hooks/message/error";

interface ModalProps {
    handleOnVisible: () => void
}

const ModalRetrieveFromQuotation = ({ handleOnVisible }: ModalProps) => {
    const { ['dealerAuth.id_dealer'] : id_dealer} = parseCookies();
    const router = useRouter()
    const { showMessage } = useMessageSuccess();
    const { setMessageError } = useMessageError();
    const [ processing, setProcessing] = useState<boolean>(false)
    const [ processing2, setProcessing2] = useState<boolean>(true)
    const [ quotationId, setQuotationId ] = useState<string|null>(null)
    const [ isDisabled, setIsDisabled] = useState(false);
    const [ options, setOptions ] = useState<[]>([]);

    useEffect(() => {
        loadQuotationAvailables()
    }, [])

    const handleSelectChange = (selectedOption: any) => {
        if(selectedOption) {
            setQuotationId(selectedOption.value);
        } else {
            setQuotationId(null);
        }
    }

    const handleCreateSalesOrderFromQuotation = (e: any) => {
        e.preventDefault()
        setProcessing(true)

        const api = getApiDealer('')
            api.post('/salesOrderFromQuotation/create', {
                id_dealer: id_dealer,
                id_quotation: quotationId
            })
                .then((response) => {
                    handleOnVisible()
                    showMessage(response?.data?.message)
                    router.push('/sales-order/'+response?.data?.data?.id)
                })
                .catch((e) => {
                    let errorString = ""

                    Object.keys(e?.response?.data?.errors).forEach((key) => {
                        e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                            errorString += `${errorMessage}<br>`
                        })
                    })

                    setMessageError(errorString)
                }).finally(() => {
                    setProcessing(false)
                })
    }

    const loadQuotationAvailables = () => {
        const api = getApiDealer('')
        api.post('/quotation/allAvailableQuotations', {
            id_dealer: id_dealer,
        })
        .then((response) => {
            setProcessing2(false)
            setOptions(response?.data?.data);
        })
    }

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            width: 320,
            height: 50,
            padding: '0 10px',
            border: '1px solid #ECECEC', // Adicione o estilo da borda conforme necessário
            borderRadius: '8px', // Adicione o raio da borda conforme necessário
            fontSize: '14px', // Adicione o tamanho da fonte conforme necessário
            fontFamily: 'Inter, sans-serif', // Adicione a família da fonte conforme necessário
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#FF9900',
                outlineColor: '#FF9900',
            },
            '&:active': {
                borderColor: '#FF9900',
                outlineColor: '#FF9900',
            },
            '&:focus-visible': {
                borderColor: '#FF9900',
                outlineColor: '#FF9900',
            },
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            fontSize: '14px', // Adicione o tamanho da fonte conforme necessário
            fontFamily: 'Inter, sans-serif', // Adicione a família da fonte conforme necessário
            color: state.isDisabled ? '#ccc' : '#000', // Altera a cor para cinza se estiver desabilitado
            backgroundColor: '#fff',
            '&:hover': { backgroundColor: '#F5F5F5' },
        }),
    };

    return (
        <div className={`w-100% h-100% top-0 left-0 fixed z-10 flex items-center justify-center animate-opacity-in`}>
            <div className={`w-screen h-screen absolute top-0 left-0 bg-black opacity-60 z-20`} onClick={handleOnVisible}></div>
            <div className={`w-auto h-auto rounded-8px p-25px z-30 bg-white justify-center flex flex-wrap items-start animate-show-in`}>
                <div className="w-500px flex items-center justify-center">
                    <p className={`text-black_two text-14px font-normal font-inter mr-4`}>
                        Select your quotation:
                    </p>

                    <Select
                        styles={customStyles}
                        name="quotation_id"
                        required={true}
                        options={options}
                        isDisabled={isDisabled}
                        onChange={handleSelectChange}
                        isLoading={processing2}
                    />
                </div>

                <div className={`w-100% flex items-center justify-center mt-2rem`}>
                    <button
                        className={`px-18px py-12px rounded-60px bg-yellow_one text-black text-14px font-semibold shadow-shadow_btn_small flex items-center`}
                        onClick={handleCreateSalesOrderFromQuotation}>
                        Generate P.O.
                        {processing && <Processing/> }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalRetrieveFromQuotation;