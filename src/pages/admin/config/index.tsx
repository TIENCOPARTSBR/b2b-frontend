import Header from "@/components/Header";
import { Main, Group, Card, Label } from "./style";
import Breadcump from "@/components/Breadcump";
import Title from "@/components/Title";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import ButtonSmall from '@/components/ButtonSmall';
import { GetServerSideProps } from "next";
import { getApiClient } from "@/api/axios";
import { parseCookies } from "nookies";
import AlertDanger from "@/components/AlertDanger";
import AlertSuccess from "@/components/AlertSuccess";
import Loader from "@/components/Loader";

const breadcump = [
    {
        name: 'Home',
        link: '/admin'
    }, {
        name: 'Configurações',
        link: '/admin/config'
    }
]

const Config = (config: any) => {
    const [dateCost, setDateCost] = useState(config.config.costDate.key_value);
    const [emailQuotation, setEmailQuotation] = useState(config.config.emailQuotation.key_value);
    const [alert, setAlert] = useState('');
    const [alertSucess, setAlertSucess] = useState('');
    const [loader, setLoader] = useState(false);

    const handleDateCost = async (e: any) => {
        e.preventDefault();
        setLoader(true);

        const data = {
            key_value: dateCost,
        }

        try {
            const api = getApiClient(``);
            const response = await api.put('/admin/config/cost-date', data);
            console.log(response);
            setAlertSucess(response?.data?.original?.message)
        } catch (error: any) {
            setAlert(error?.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }

    const handleEmailQuotation = async (e: any) => {
        e.preventDefault();
        setLoader(true);
        
        const data = {
            key_value: emailQuotation,
        }

        try {
            const api = getApiClient(``);
            const response = await api.put('/admin/config/email-quotation', data);
            setAlertSucess(response?.data?.original?.message)
        } catch (error: any) {
            setAlert(error?.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setAlertSucess('');
        }, (3000));
    }, [alertSucess])

    return (
        <>
            {loader && (
                <Loader></Loader>
            )}
            {alertSucess && (
                <AlertSuccess text={alertSucess} />
            )}
            {alert && (
                <AlertDanger text={alert}/>
            )}
            <Header/>
            <Main>
                <Group>
                    <Breadcump breadcump={breadcump}/>
                    <Title>Configurações</Title>
                </Group>

                <Card onSubmit={handleDateCost}>
                    <Label>Data de custo</Label>
                    <Input type="date" value={dateCost} onChange={(e: any) => {setDateCost(e.target.value)}}/>
                    <ButtonSmall name="Salvar" />
                </Card>

                <Card onSubmit={handleEmailQuotation}>
                    <Label>E-mail de cotações</Label>
                    <Input type="email" value={emailQuotation} placeholder="example@encoparts.com" onChange={(e: any) => {setEmailQuotation(e.target.value)}}/>
                    <ButtonSmall name="Salvar" />
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