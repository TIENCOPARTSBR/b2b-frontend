// assets
import React, { useEffect, useState } from "react"
import { Main, Group, Form, GroupForm, Label, Select } from "../../../../Styles/admin/direct-distributor/new/style"
import { useRouter } from "next/router"

// components
import Header from "@/components/Header"
import Breadcump from "@/components/Breadcump"
import Title from "@/components/Title"
import Input from "@/components/Input"
import ButtonSmall from "@/components/ButtonSmall"

// api 
import Loader from "@/components/Loader"
import { getApiClient } from "@/api/axios"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import Error from "@/components/Error"
import HeaderMobile from "@/components/HeaderMobile"
import { ListHeaderAdmin } from "@/service/HeaderAdmin"

type TypeData = {
    name: string | null
    allow_quotation: string | null
    allow_partner: string | null
    sisrev_brazil_code: string | null
    sisrev_eua_code: string | null
}

const breadcump = [
    {
        name: 'Home',
        link: '/admin'
    }, {
        name: 'Direct distributors',
        link: '/admin/direct-distributor'
    }, {
        name: 'New',
        link: '/admin/direct-distributor/new'
    },
]

const NewDirectDistributor = () => {
    const router = useRouter() // use app router 
    const [name, setName] = useState<string>("") // nome da empresa
    const [allowQuotation, setAllowQuotation] = useState<string>("") // permitir cotações
    const [allowPartner, setAllowPartner] = useState<string>("") // permitir parceiros
    const [sisrevBrazilCode, setSisrevBrazilCode] = useState<string>("") // código do cliente no sisrev brasil
    const [sisrevEuaCode, setSisrevEuaCode] = useState<string>("") // código do cliente no sisrev llc
    const [error, setError] = useState<string | null>(null) // alerta de erro
    const [redirect, setRedirect] = useState<boolean>(false) // redirecionamento após conclusão 
    const [loader, setLoader] = useState<boolean>(false) // tela de carregamento

    useEffect(() => {
        setTimeout(() => {
            setError(null)
        }, 5000);
    }, [error])

    useEffect(() => {
        (redirect) ? router.push('/admin/direct-distributor') : ''
    }, [redirect])

    // função que envia um novo distribuidor para API
    const handleNewDirectDistributor = async (e: any) => {
        e.preventDefault()
        setLoader(true)
        setError(null)
        
        const data: TypeData = {
            name: name,
            allow_quotation: allowQuotation,
            allow_partner: allowPartner,
            sisrev_brazil_code: sisrevBrazilCode,
            sisrev_eua_code: sisrevEuaCode,
        }

        try {
            const api = getApiClient(``)
            await api.post('/admin/direct-distributor', data) // envia os dados para API
            setRedirect(true) // ativa o redirecionamento
        } catch (error: any) {
            setError(error?.response?.data?.message || "Unable to register a new direct distributor.") // alerta de erro
        } finally {
            setLoader(false) // fecha a tela de carregamento
        }
    }

    return (
        <>
            {loader && (<Loader></Loader>)}
            {error && (<Error error={error}/>)}
            <Header list={ListHeaderAdmin}/>
            <HeaderMobile list={ListHeaderAdmin}/>
            <Main>
                <Group>
                    <Breadcump breadcump={breadcump}/>
                    <Title>New direct distributor</Title>
                </Group>

                <Form onSubmit={handleNewDirectDistributor}>
                    <GroupForm>
                        <Label>Company</Label>
                        <Input required={true} type="text" name="name" placeholder="Enter the company name" onChange={(e: any) => {setName(e.target.value)}}/>
                    </GroupForm>
                    
                    <GroupForm>
                        <Label>Allow quotation</Label>
                        <Select onChange={(e: any) => {setAllowQuotation(e.target.value)}}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </Select>
                    </GroupForm>

                    <GroupForm>
                        <Label>Allow partner</Label>
                        <Select onChange={(e: any) => {setAllowPartner(e.target.value)}}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </Select>
                    </GroupForm>

                    <GroupForm>
                        <Label>Code Sisrev Brasil</Label>
                        <Input required={true} type="text" name="sisrevBrazilCode" placeholder="0000" onChange={(e: any) => {setSisrevBrazilCode(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Code Sisrev LLC</Label>
                        <Input required={true} type="text" name="sisrevEuaCode" placeholder="0000" onChange={(e: any) => {setSisrevEuaCode(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm></GroupForm>

                    <ButtonSmall name="Create direct distributor"/>
                </Form>
            </Main>
        </>
    )
}

export default NewDirectDistributor;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['adminAuth.token']: token } = parseCookies(ctx)

    if (!token) {
       return {
          redirect: {
             destination: '/admin/auth/login',
             permanent: false,
          }
       }
    }

    return {
        props: {}
    }
}