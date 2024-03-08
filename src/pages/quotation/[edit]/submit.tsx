import React, { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import { getApiDealer } from "@/src/api/dealer/axios";
import { useMessageSuccess } from "@/src/hooks/message/success";
import { useMessageError } from "@/src/hooks/message/error";
import Processing from "@/src/components/Processing";

const Submit = () => {
    const { ['dealerAuth.id_dealer']: id_dealer} = parseCookies();

    const router = useRouter();
    const { showMessage } = useMessageSuccess();
    const { setMessageError } = useMessageError();
    const [ processing, setProcessing ] = useState<boolean>(false)
    const [ acceptedTerms, SetAcceptedTerms ] = useState<boolean>(false);

    const handleChangeCheckbox =  (e: React.ChangeEvent<HTMLInputElement>) => {
        SetAcceptedTerms(e.target.value === 'on')
    }

    const handleSubmitQuotation = async (e: any) => {
        e.preventDefault();

        setProcessing(true)

        const api = getApiDealer('');
        await api.post('/quotation/sisrev', {
            id_quotation: router?.query?.edit,
            id_dealer: id_dealer,
        })
            .then((response: any) => {
                showMessage(response?.data?.message);
                router?.push('/quotation');
            })
            .catch((e: any) => {
                let errorString = "";

                Object.keys(e?.response?.data?.errors).forEach((key) => {
                    e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                        errorString += `${errorMessage}<br>`;
                    })
                })

                setMessageError(errorString);
            })
            .finally(() => {
                setProcessing(false)

                setTimeout(() => {
                    setMessageError('')
                }, 10000)
            })
    }

    return (
        <div className="w-fill mt-10 flex flex-wrap md:justify-between items-center">
            <label htmlFor="accepted" className="w-fill md:w-8/12 items-center flex text-12px font-normal font-inter text-black mb-5 md:mb-0 md:pr-5">
                <input
                    type="checkbox"
                    name="accepted"
                    className="mr-2 w-15px h-15px"
                    onChange={handleChangeCheckbox}
                />
                I declare that I am aware of the information provided through this quotation and attest to the accuracy
                of the data, especially with regard to the "Application" and "Observation" columns.
            </label>

            <button onClick={handleSubmitQuotation} className={`w-fill px-15px py-12px rounded-60px bg-grey_seven text-white flex items-center flex-nowrap text-13px font-medium font-inter ${!acceptedTerms ? 'pointer-events-none opacity-50' : ''}`}>
                Submit { processing && <Processing /> }
            </button>
        </div>
    )
}

export default Submit;