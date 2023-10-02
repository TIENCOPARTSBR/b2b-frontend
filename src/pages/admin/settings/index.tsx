// assets
import { Main, Group, Card, Label } from "../../../Styles/admin/settings/style"
import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"

// components
import Loader from "@/components/Loader"
import Success from "@/components/Success"
import Error from "@/components/Error"
import ButtonSmall from '@/components/ButtonSmall'
import Breadcump from "@/components/Breadcump"
import Title from "@/components/Title"
import Input from "@/components/Input"
import Header from "@/components/Header"

// api
import { getApiClient } from "@/api/axios"
import HeaderMobile from "@/components/HeaderMobile"

const breadcump = [
    {
        name: 'Home',
        link: '/admin'
    }, {
        name: 'Settings',
        link: '/admin/config'
    }
]

const Config = (config: any) => {
    const [dateCost, setDateCost] = useState<string>(config.config.costDate.key_value)
    const [emailQuotation, setEmailQuotation] = useState<string>(config.config.emailQuotation.key_value)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [loader, setLoader] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            setSuccess(null)
        }, (5000));
    }, [success])

    useEffect(() => {
        setTimeout(() => {
            setError(null)
        }, (5000));
    }, [error])

    const handleDateCost = async (e: any) => {
        e.preventDefault();
        setLoader(true)
        setError(null)
        setSuccess(null)

        const data = {
            key_value: dateCost,
        }

        try {
            const api = getApiClient(``)
            const response = await api.put('/admin/config/cost-date', data)
            console.log(response);
            setSuccess(response?.data?.original?.message)
        } catch (error: any) {
            setError(error?.response?.data?.message)
        } finally {
            setLoader(false);
        }
    }

    const handleEmailQuotation = async (e: any) => {
        e.preventDefault();
        setLoader(true)
        setError(null)
        setSuccess(null)
        
        const data = {
            key_value: emailQuotation,
        }

        try {
            const api = getApiClient(``);
            const response = await api.put('/admin/config/email-quotation', data);
            setSuccess(response?.data?.original?.message)
        } catch (error: any) {
            setError(error?.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }

    return (
        <>
            {loader && (<Loader></Loader>)}
            {success && (<Success success={success}/>)}
            {error && (<Error error={error}/>)}
            <Header/>
            <HeaderMobile/>
            <Main>
                <Group>
                    <Breadcump breadcump={breadcump}/>
                    <Title>Settings</Title>
                </Group>

                <Card onSubmit={handleDateCost}>
                    <Label>Cost date</Label>
                    <Input type="date" value={dateCost} onChange={(e: any) => {setDateCost(e.target.value)}}/>
                    <ButtonSmall name="Save" />
                </Card>

                <Card onSubmit={handleEmailQuotation}>
                    <Label>Quotation email</Label>
                    <Input type="email" value={emailQuotation} placeholder="example@encoparts.com" onChange={(e: any) => {setEmailQuotation(e.target.value)}}/>
                    <ButtonSmall name="Save" />
                </Card>
            </Main>
        </>
    )
}

export default Config;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['adminAuth.token']: token } = parseCookies(ctx);

    if (!token) {
       return {
          redirect: {
             destination: '/admin/auth/login',
             permanent: false,
          }
       }
    }

    try {
        const api = getApiClient(ctx);
        const costDate = await api.get('/admin/config/cost-date');
        const emailQuotation = await api.get('/admin/config/email-quotation');

        const config = {
            costDate: costDate.data,
            emailQuotation: emailQuotation.data
        } 
     
        return {
            props: {
                config
            }
        }

    } catch (error) {
        return {
            props: {
                config: null
            }
        }
    }
}