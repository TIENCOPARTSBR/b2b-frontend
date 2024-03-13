import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import { useAuthDealer } from "@/src/hooks/dealer/auth";
import { useMessageError } from "@/src/hooks/message/error";
import { useMessageSuccess } from "@/src/hooks/message/success";
import { getApiDealer } from "@/src/api/dealer/axios";

import Main from "@/src/components/Dealer/Main";
import Row from "@/src/components/Dealer/Row";
import Title from "@/src/components/Title";
import Breadcrumb from "@/src/components/Breadcrumb";
import Label from "@/src/components/Label";
import ButtonSmall from "@/src/components/ButtonSmall";
import Processing from "@/src/components/Processing";

interface NewOrderProps {
    id_dealer: number|any
}

const Index = ({ id_dealer } : NewOrderProps) => {
    const router = useRouter();
    const api = getApiDealer('');
    const { user } = useAuthDealer('');
    const [ processing, setProcessing ] = useState<boolean>(false);
    const { showMessage } = useMessageSuccess();
    const { setMessageError } = useMessageError();

    const [formData, setFormData] = useState({
        client_name: undefined,
        client_order: undefined,
        payment_method: undefined,
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

        api.post('/salesOrder/create', formData)
           .then((response) => {
               showMessage(response?.data?.message)
               router.push(`/order/${response?.data?.data?.id}`)
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

    const breadcrumb: [{ name: string; link: string }, { name: string; link: string }, {
        name: string;
        link: string
    }] = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Orders",
            link: "/order",
        },
        {
            name: "Submit Purchase Order",
            link: "/order/new",
        },
    ];

    return (
        <Main>
            <Row>
                <Breadcrumb list={breadcrumb} />
                <Title title="Submit Purchase Order" />
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
                        <Label>Method Payment</Label>
                        <input type="text"
                               name="payment_method"
                               placeholder="30 Days"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-13px placeholder:text-grey_seven text-black font-inter font-normal outline-yellow_two"
                               value={formData.payment_method}
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
                    Create order
                    { processing && <Processing/>}
                </ButtonSmall>
            </form>
        </Main>
    )
}

export default Index

export const getServerSideProps: GetServerSideProps<NewOrderProps> = async (ctx) => {
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