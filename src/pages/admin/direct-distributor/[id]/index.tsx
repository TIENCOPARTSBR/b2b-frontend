// assets
import React, { useEffect, useState } from "react";
import { Main, Group, Form, GroupForm, Label, Select } from "./style";
import { useRouter } from "next/router";

// components
import Header from "@/components/Header";
import Breadcump from "@/components/Breadcump";
import Title from "@/components/Title";
import Input from "@/components/Input";
import ButtonSmall from "@/components/ButtonSmall";
import AlertDanger from "@/components/AlertDanger";

// api 
import Loader from "@/components/Loader";
import { getApiClient } from "@/api/axios";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Error from "@/components/Error";

const breadcump = [
    {
        name: 'Home',
        link: '/admin'
    }, {
        name: 'Distribuidores direto',
        link: '/admin/direct-distributor'
    }, {
        name: 'Editar',
        link: '/admin/direct-distributor/edit'
    },
]

type TypeData = {
    name: string | null
    allow_quotation: string | null
    allow_partner: string | null
    sisrev_brazil_code: string | null
    sisrev_eua_code: string | null
}

const EditDirectDistributor = ({directDistributor}: any) => {
    const router = useRouter()
    const userId = router?.query?.id
    const [name, setName] = useState<string | null>(directDistributor.name) // nome da empresa
    const [allowQuotation, setAllowQuotation] = useState<string | null>(directDistributor.allow_quotation) // permitir cotações
    const [allowPartner, setAllowPartner] = useState<string | null>(directDistributor.allow_partner) // permitir parceiros
    const [sisrevBrazilCode, setSisrevBrazilCode] = useState<string | null>(directDistributor.sisrev_brazil_code) // código do cliente no sisrev brasil
    const [sisrevEuaCode, setSisrevEuaCode] = useState<string | null>(directDistributor.sisrev_eua_code) // código do cliente no sisrev llc
    const [error, setError] = useState<string | null>(null)
    const [redirect, setRedirect] = useState<boolean>(false)
    const [loader, setLoader] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            setError(null)
        }, 5000);
    }, [error])

    useEffect(() => {
        (redirect) ? router.push('/admin/direct-distributor') : ''
    }, [redirect])

    const hadleUpdateDirectDistributor = async (e: any) => {
        e.preventDefault()
        setLoader(true)
        setError(null)

        const data: TypeData = {
            name: name,
            allow_quotation: allowQuotation,
            allow_partner: allowPartner,
            sisrev_brazil_code: sisrevBrazilCode,
            sisrev_eua_code: sisrevEuaCode,
        };
        
        try {
            const api = getApiClient(``);
            await api.put('/admin/direct-distributor/'+ userId, data);
            setRedirect(true);
        } catch (error: any) {
            setError(error?.response?.data?.message || "Não foi possível atualizar o distribuidor direto.");
        } finally {
            setLoader(false);
        }
    }

    return (
        <>
            {loader && (<Loader></Loader>)}
            {error && (<Error error={error}/>)}
            <Header/>
            <Main>
                <Group>
                    <Breadcump breadcump={breadcump}/>
                    <Title>Editar distribuidor direto</Title>
                </Group>

                <Form onSubmit={hadleUpdateDirectDistributor}>
                <GroupForm>
                        <Label>Empresa</Label>
                        <Input required={true} type="text" name="name" placeholder="Digite o nome da empresa" value={name} onChange={(e: any) => {setName(e.target.value)}}/>
                    </GroupForm>
                    
                    <GroupForm>
                        <Label>Permitir cotação</Label>
                        <Select onChange={(e: any) => {setAllowQuotation(e.target.value)}}>
                            <option value="0" selected={allowQuotation == '0'}>Não</option>
                            <option value="1" selected={allowQuotation == '1'}>Sim</option>
                        </Select>
                    </GroupForm>

                    <GroupForm>
                        <Label>Permitir parceiro</Label>
                        <Select onChange={(e: any) => {setAllowPartner(e.target.value)}}>
                            <option value="0" selected={allowPartner == '0'}>Não</option>
                            <option value="1" selected={allowPartner == '1'}>Sim</option>
                        </Select>
                    </GroupForm>

                    <GroupForm>
                        <Label>Código do Sisrev Brasil</Label>
                        <Input required={true} type="text" name="sisrevBrazilCode" placeholder="0000" value={sisrevBrazilCode} onChange={(e: any) => {setSisrevBrazilCode(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Código do Sisrev LLC</Label>
                        <Input required={true} type="text" name="sisrevEuaCode" placeholder="0000" value={sisrevEuaCode} onChange={(e: any) => {setSisrevEuaCode(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm></GroupForm>
                    
                    <ButtonSmall name="Atualizar"/>
                </Form>
            </Main>
        </>
    )
}

export default EditDirectDistributor;


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
        // Obtenha o userId dos parâmetros da rota
        const userId = ctx?.params?.id;
   
        // Api
        const api = getApiClient(ctx);
        const response = await api.get('/admin/direct-distributor/'+ userId);
        const directDistributor = response.data;
     
        return {
            props: {
                directDistributor
            }
        }

    } catch (error) {
        return {
            props: {
                directDistributor: null
            }
        }
    }
}