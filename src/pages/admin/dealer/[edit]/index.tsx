import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import {
    breadcrumb,
    title
} from '@/src/utils/constants/Admin/Dealer/Edit/util';

import Main from '@/src/components/Admin/Main';
import Breadcrumb from '@/src/components/Breadcrumb';
import Title from '@/src/components/Title';
import Label from '@/src/components/Label';
import ButtonSmall from '@/src/components/ButtonSmall';
import AlertError from '@/src/components/AlertError';
import Processing from '@/src/components/Processing';

import { useMessageSuccess } from '@/src/hooks/message/success';
import { getApiAdmin } from '@/src/api/adm/axios';
import { parseCookies } from 'nookies';

type Dealer = {
    id: number
    name: string,
    is_active: number,
    type_of_access: number,
    allow_quotation: number,
    allow_partner: number,
    sisrev_usa_code: string,
    sisrev_br_code: string,
}

type Token = {
    token: string;
}

interface PropsDealer {
    dealer: Dealer
    token: Token
}

const EditDealer = ({ dealer, token } : PropsDealer) => {
    const router = useRouter()

    const { showMessage : showMessageSuccess } = useMessageSuccess()
    const [ alertError, setAlertError] = useState<string|null>(null)
    const [ processingDealer, setProcessingDealer] = useState<boolean>(false)
    const [ processingToken, setProcessingToken] = useState<boolean>(false)
    const [ showFormApiToken,  SetShowFormApiToken ] = useState<boolean>(false)

    const [ tokenApi, setTokenApi ] = useState<string>(token?.token)

    const [formData, setFormData] = useState({
        id: router?.query?.edit,
        name: dealer?.name,
        is_active: dealer?.is_active,
        type_of_access: dealer?.type_of_access,
        allow_quotation: dealer?.allow_quotation,
        allow_partner: dealer?.allow_partner,
        sisrev_llc_code: dealer?.sisrev_usa_code,
        sisrev_br_code: dealer?.sisrev_br_code
    });

    useEffect(() => {
        if (formData.type_of_access === 1)
            SetShowFormApiToken(true)
    }, [formData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((formData) => ({ ...formData, [name]: value }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((formData) => ({ ...formData, [name]: value }))
    }

    const handleFormSubmit = (e: any) => {
        e.preventDefault()

        setProcessingDealer(true)
        setAlertError(null)

        const api = getApiAdmin('')
        api.put('/dealer/update', {...formData})
            .then((response) => {
                showMessageSuccess(response?.data?.message)
                handleReloadTokenApi()
        }).catch((e) => {
            let errorString = ''

            Object.keys(e?.response?.data?.errors).forEach((key) => {
                e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                    errorString += `${errorMessage}<br>`
                })
            })

            setAlertError(errorString)
        }).finally(() => {
            setProcessingDealer(false)
            setTimeout(() => {
                setAlertError(null)
            }, 10000)
        })
    }

    const handleGenerateTokenApi = (e: any) => {
        e.preventDefault();

        setProcessingToken(true)
        setAlertError(null)

        const api = getApiAdmin('')
        api.post('/dealer/token/generate', {
            id_dealer: router?.query?.edit
        })
            .then((response) => {
                setTokenApi(response?.data?.data?.token)
                showMessageSuccess(response?.data?.message)
            }).catch((e) => {
                let errorString = ''

                Object.keys(e?.response?.data?.errors).forEach((key) => {
                    e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                        errorString += `${errorMessage}<br>`
                    })
                })

                setAlertError(errorString)
            }).finally(() => {
                setProcessingToken(false)
                setTimeout(() => {
                    setAlertError(null)
                }, 10000)
            })
    }

    const handleReloadTokenApi = () => {
        const api = getApiAdmin('')
            api.post('/dealer/token/get', {
                id_dealer: router?.query?.edit
            }).then((response) => {
                setTokenApi(response?.data?.data)
            }).catch(() => {
                setTokenApi('')
            });
    }

    return (
        <Main>
            {alertError && <AlertError text={alertError}/>}

            <div className='w-100% md:w-50% flex flex-col mb-45px'>
                <Breadcrumb list={breadcrumb}/>
                <Title title={title}/>
            </div>

            <form onSubmit={handleFormSubmit}
                  className='w-100% border-1 border-grey_six p-25px rounded-8px flex flex-wrap md:justify-between'>
                <div className='md:w-1/4 w-100% flex-auto mb-5 mr-5'>
                    <Label>Name</Label>

                    <input
                        className='w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px'
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className='md:w-1/4 w-100% flex-auto mb-5 mr-5'>
                    <Label>Status</Label>

                    <select
                        className='w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px'
                        name='is_active'
                        value={formData.is_active} // Use '1' e '0' como strings
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value='1'>Ativo</option>
                        <option value='0'>Inativo</option>
                    </select>
                </div>


                <div className='md:w-1/4 w-100% flex-auto mb-5 mr-5'>
                    <Label>Type of access</Label>

                    <select
                        className='w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px'
                        name='type_of_access'
                        value={formData.type_of_access}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value='0'>B2B Portal</option>
                        <option value='1'>API</option>
                    </select>
                </div>

                <div className='md:w-1/4 w-100% mb-5 mr-5'>
                    <Label>Allow to quotation?</Label>

                    <select
                        className='w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px'
                        name='allow_quotation'
                        value={formData.allow_quotation}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value='1'>Yes</option>
                        <option value='0'>No</option>
                    </select>
                </div>

                <div className='md:w-1/6 w-100% flex-auto mb-5 mr-5'>
                    <Label>Allow to partner?</Label>

                    <select
                        className='w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px'
                        name='allow_partner'
                        value={formData.allow_partner}
                        onChange={handleSelectChange}
                        required={true}
                    >
                        <option value='1'>Yes</option>
                        <option value='0'>No</option>
                    </select>
                </div>

                <div className='md:w-1/6 w-100% flex-auto mb-5 mr-5'>
                    <Label>Code Sisrev Brazil</Label>

                    <input
                        className='w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px'
                        type='text'
                        placeholder='5432'
                        name='sisrev_br_code'
                        value={formData.sisrev_br_code}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className='md:w-1/6 w-100% flex-auto mb-5 mr-5'>
                    <Label>Code Sisrev LLC</Label>

                    <input
                        className='w-100% border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px'
                        type='text'
                        placeholder='1234'
                        name='sisrev_llc_code'
                        value={formData.sisrev_llc_code}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>

                <div className='w-100%'>
                    <ButtonSmall bgColor='bg-yellow_one'>
                        Updated Dealer
                        {processingDealer && <Processing/>}
                    </ButtonSmall>
                </div>
            </form>

            { showFormApiToken && (
                <>
                    <div className='w-100% md:w-50% flex flex-col mt-45px mb-45px'>
                        <Title title="Generate token API"/>
                    </div>

                    <form onSubmit={handleGenerateTokenApi}
                          className="w-100% border-1 border-grey_six p-25px rounded-8px flex flex-col">
                        <input
                            className='w-auto mb-5 border-1 border-grey_six py-10px px-15px rounded-8px focus:outline-yellow_one text-black font-normal font-inter text-13px'
                            type='text'
                            readOnly={true}
                            disabled={true}
                            name="token_api"
                            value={tokenApi}
                        />

                        <div>
                            <ButtonSmall bgColor='bg-yellow_one'>
                                Generate new token
                                {processingToken && <Processing/>}
                            </ButtonSmall>
                        </div>
                    </form>
                </>
            )}
        </Main>
    )
}

export default EditDealer;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {['adminAuth.token']: token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            }
        }
    }

    try {
        const api = getApiAdmin(ctx);
        const dealerData = await api.post('/dealer/', {id: ctx?.params?.edit});

        let responseToken = '';

        await api.post('/dealer/token/get', {
            id_dealer: ctx?.params?.edit
        }).then((response) => {
            responseToken = response?.data?.data;
        }).catch(() => {
            responseToken = '';
        });

        return {
            props: {
                dealer: dealerData?.data?.data || [],
                token: responseToken
            }
        }
    } catch (error) {
        return {
            props: {
                dealer: [],
                token: [],
            }
        };
    }
}

