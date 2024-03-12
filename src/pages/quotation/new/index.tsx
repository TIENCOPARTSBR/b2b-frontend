import { useRouter } from "next/navigation"
import React, { useState } from "react"

import { breadcrumb, TitleConst } from "@/src/utils/constants/quotation/new/util"

import Main from "@/src/components/Dealer/Main"
import Breadcrumb from "@/src/components/Breadcrumb"
import Title from "@/src/components/Title"
import Label from "@/src/components/Label"
import ButtonSmall from "@/src/components/ButtonSmall"
import Row from "@/src/components/Dealer/Row"
import Processing from "@/src/components/Processing";
import { getApiDealer } from "@/src/api/dealer/axios";
import { useMessageSuccess } from "@/src/hooks/message/success";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useAuthDealer } from "@/src/hooks/dealer/auth";
import { useMessageError } from "@/src/hooks/message/error";

interface NewQuotationProps {
    id_dealer: number|any
}

const Index = ({ id_dealer } : NewQuotationProps) => {
    const router = useRouter();
    const api = getApiDealer('')
    const { user } = useAuthDealer('');
    const [ processing, setProcessing ] = useState<boolean>(false);
    const { showMessage } = useMessageSuccess();
    const { setMessageError } = useMessageError();

    const [formData, setFormData] = useState({
        client_name: undefined,
        client_order: undefined,
        requested_by: user?.name,
        urgent: 0,
        deadline: undefined,
        type: 0,
        status: 0,
        id_dealer: id_dealer
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handeRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked  } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);

        api.post('/quotation/create', formData)
           .then((response) => {
               showMessage(response?.data?.message)
               router.push(`/quotation/${response?.data?.data?.id}`)
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
               setProcessing(false)
           })
    }

    return (
        <Main>
            <Row>
                <Breadcrumb list={breadcrumb()} />
                <Title title={TitleConst} />
            </Row>
            
            <form onSubmit={(e:React.FormEvent<HTMLFormElement>) => {handleSubmit(e)}}>
                <div className="flex p-35px mt-35px rounded-8px border-1 border-grey_six mb-35px">
                    <div className="flex-auto w-4/12 pr-5">
                        <Label>Client name</Label>
                        <input type="text"
                               name="client_name"
                               placeholder="Insert client name"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-13px placeholder:placeholder:text-grey_seven text-black font-inter font-normal outline-yellow_two"
                               value={formData.client_name}
                               onChange={handleInputChange}
                               required={true}
                        />
                    </div>

                    <div className="flex-auto w-2/12 pr-5">
                        <Label>Client order number</Label>
                        <input type="text"
                               name="client_order"
                               placeholder="Insert client order number"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-13px placeholder:text-grey_seven text-black font-inter font-normal outline-yellow_two"
                               value={formData.client_order}
                               onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex-auto w-2/12 pr-5">
                        <Label>Requested by</Label>
                        <input type="text"
                               name="requested_by"
                               placeholder="Raul Vasquez"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-13px placeholder:text-grey_seven text-black font-inter font-normal outline-yellow_two"
                               value={formData.requested_by}
                               onChange={handleInputChange}
                               required={true}
                        />
                    </div>

                    <div className="flex-auto w-auto pr-5">
                        <Label>Urgent?</Label>
                        <div>
                            <label htmlFor="toggle" className="flex items-center cursor-pointer">
                                <input type="checkbox"
                                       id="toggle"
                                       className="sr-only peer"
                                       name="urgent"
                                       value={formData.urgent}
                                       onChange={handeRadioChange}
                                />
                                    <div className="block relative bg-grey_eight w-60px h-32px p-1 rounded-full before:absolute before:bg-white before:w-6 before:h-6 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:before:bg-white peer-checked:bg-red_one"></div>
                            </label>
                        </div>
                    </div>

                    <div className="flex-auto w-auto pr-5">
                        <Label>Deadline</Label>
                        <input type="datetime-local"
                               name="deadline"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-13px placeholder:text-grey_seven text-black font-inter font-normal outline-yellow_two"
                               value={formData.deadline}
                               checked={formData.deadline === 'true'}
                               onChange={handleInputChange}
                               required={true}
                        />
                    </div>

                    <div className="flex-auto w-2/12">
                        <Label>Type</Label>
                        <select
                            className="w-100% border-1 border-grey_six rounded-8px py-9px px-12px text-13px placeholder:text-grey_seven text-black font-inter font-normal outline-yellow_two"
                            name="type"
                            value={formData.type}
                            onChange={handleSelectChange}
                            required={true}
                        >
                            <option value="0">Template</option>
                            <option value="1">Spot</option>
                        </select>
                    </div>
                </div>

                <ButtonSmall bgColor="bg-grey_seven">
                    Create quotation
                    { processing && <Processing/>}
                </ButtonSmall>
            </form>
        </Main>
    )
}

export default Index

export const getServerSideProps: GetServerSideProps<NewQuotationProps> = async (ctx) => {
    const { ['dealerAuth.token'] : token} = parseCookies(ctx);
    const { ["dealerAuth.id_dealer"] : id_dealer} = parseCookies(ctx);
    
    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }
    
    return {
        props: {
            id_dealer: id_dealer
        }
    }
}