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

    const handleSubmitQuotation = async (e: any) => {3
        e.preventDefault();
        setProcessing(true)

        const api = getApiDealer('');
        await api.post('/pre-order/send-to-sisrev', {
            id_sales_order: router?.query?.order,
            id_dealer: id_dealer,
        })
            .then((response: any) => {
                showMessage(response?.data?.message);
                router?.push('/order');
            })
            .catch((e: any) => {
                console.error(e);
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
            })
    }

    return (
       <>
           <div
              className="w-full flex p-25px rounded-t-8px border-1 bg-grey_six border-grey_six items-end flex-wrap mt-45px">
               <p className="w-fill items-center flex text-12px font-normal cursor-pointer font-inter text-black">
                   <strong>NOTE:&nbsp;</strong> If all requested part numbers are up to date and has price, lead time or
                   availability to fulfill your order, your request will be promply placed as a P.O.
               </p>
           </div>

           <div
              className="w-fill border-1 border-grey_six rounded-b-8px px-25px py-15px flex flex-wrap md:justify-between items-center">
               <label htmlFor="accepted"
                      className="w-fill md:w-8/12 items-center flex text-12px font-normal cursor-pointer font-inter text-black mb-5 md:mb-0 md:pr-5">
                   <input
                      id="accepted"
                      type="checkbox"
                      name="accepted"
                      className="mr-2 w-15px h-15px"
                      onChange={handleChangeCheckbox}
                   />
                   I declare that I am aware of the information provided through this quotation and attest to the
                   accuracy
                   of the data, especially with regard to the "Application" and "Observation" columns.
               </label>

               <button onClick={handleSubmitQuotation}
                       className={`w-fill px-15px py-12px rounded-60px bg-yellow_two text-black flex items-center flex-nowrap text-13px font-medium font-inter ${!acceptedTerms ? 'pointer-events-none opacity-50' : ''}`}>
                   Submit {processing && <Processing/>}
               </button>
           </div>
       </>
    )
}

export default Submit;