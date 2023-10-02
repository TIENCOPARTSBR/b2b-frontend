// assets
import React, { useEffect, useState } from "react";
import { Main, Group, Form, GroupForm, Label, Select } from "../../../../Styles/admin/direct-distributor/edit/style";
import { useRouter } from "next/router";

// components
import Header from "@/components/Header";
import Breadcump from "@/components/Breadcump";
import Title from "@/components/Title";
import Input from "@/components/Input";
import ButtonSmall from "@/components/ButtonSmall";

// api 
import Loader from "@/components/Loader";
import { getApiClient } from "@/api/axios";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Error from "@/components/Error";
import HeaderMobile from "@/components/HeaderMobile";

const breadcump = [
    {
        name: 'Home',
        link: '/admin'
    }, {
        name: 'Direct distributor',
        link: '/admin/direct-distributor'
    }, {
        name: 'Edit',
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
    const [name, setName] = useState<string>(directDistributor.name) // nome da empresa
    const [allowQuotation, setAllowQuotation] = useState<string>(directDistributor.allow_quotation) // permitir cotações
    const [allowPartner, setAllowPartner] = useState<string>(directDistributor.allow_partner) // permitir parceiros
    const [sisrevBrazilCode, setSisrevBrazilCode] = useState<string>(directDistributor.sisrev_brazil_code) // código do cliente no sisrev brasil
    const [sisrevEuaCode, setSisrevEuaCode] = useState<string>(directDistributor.sisrev_eua_code) // código do cliente no sisrev llc
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
            setError(error?.response?.data?.message || "Unable to update direct distributor.");
        } finally {
            setLoader(false);
        }
    }

    return (
        <>
            {loader && (<Loader></Loader>)}
            {error && (<Error error={error}/>)}
            <Header/>
            <HeaderMobile/>
            <Main>
                <Group>
                    <Breadcump breadcump={breadcump}/>
                    <Title>Edit direct distributor</Title>
                </Group>

                <Form onSubmit={hadleUpdateDirectDistributor}>
                <GroupForm>
                        <Label>Empresa</Label>
                        <Input required={true} type="text" name="name" placeholder="Enter the company name" value={name} onChange={(e: any) => {setName(e.target.value)}}/>
                    </GroupForm>
                    
                    <GroupForm>
                        <Label>Allow quotation</Label>
                        <Select onChange={(e: any) => {setAllowQuotation(e.target.value)}}>
                            <option value="0" selected={allowQuotation == '0'}>No</option>
                            <option value="1" selected={allowQuotation == '1'}>Yes</option>
                        </Select>
                    </GroupForm>

                    <GroupForm>
                        <Label>Allow partner</Label>
                        <Select onChange={(e: any) => {setAllowPartner(e.target.value)}}>
                            <option value="0" selected={allowPartner == '0'}>No</option>
                            <option value="1" selected={allowPartner == '1'}>Yes</option>
                        </Select>
                    </GroupForm>

                    <GroupForm>
                        <Label>Code Sisrev Brasil</Label>
                        <Input required={true} type="text" name="sisrevBrazilCode" placeholder="0000" value={sisrevBrazilCode} onChange={(e: any) => {setSisrevBrazilCode(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Code Sisrev LLC</Label>
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