// assets
import React, { useEffect, useState } from "react"
import { Main, Group, Form, GroupForm, Label, Select } from "./style"
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
        name: 'Distribuidores direto',
        link: '/admin/direct-distributor'
    }, {
        name: 'Novo',
        link: '/admin/direct-distributor/new'
    },
]

const NewDirectDistributor = () => {
    const router = useRouter() // use app router 
    const [name, setName] = useState<string | null>(null) // nome da empresa
    const [allowQuotation, setAllowQuotation] = useState<string | null>(null) // permitir cotações
    const [allowPartner, setAllowPartner] = useState<string | null>(null) // permitir parceiros
    const [sisrevBrazilCode, setSisrevBrazilCode] = useState<string | null>(null) // código do cliente no sisrev brasil
    const [sisrevEuaCode, setSisrevEuaCode] = useState<string | null>(null) // código do cliente no sisrev llc
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
            setError(error?.response?.data?.message || "Não foi possível cadastar um novo distribuidor direto.") // alerta de erro
        } finally {
            setLoader(false) // fecha a tela de carregamento
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
                    <Title>Novo distribuidor</Title>
                </Group>

                <Form onSubmit={handleNewDirectDistributor}>
                    <GroupForm>
                        <Label>Empresa</Label>
                        <Input required={true} type="text" name="name" placeholder="Digite o nome da empresa" onChange={(e: any) => {setName(e.target.value)}}/>
                    </GroupForm>
                    
                    <GroupForm>
                        <Label>Permitir cotação</Label>
                        <Select onChange={(e: any) => {setAllowQuotation(e.target.value)}}>
                            <option value="0">Não</option>
                            <option value="1">Sim</option>
                        </Select>
                    </GroupForm>

                    <GroupForm>
                        <Label>Permitir parceiro</Label>
                        <Select onChange={(e: any) => {setAllowPartner(e.target.value)}}>
                            <option value="0">Não</option>
                            <option value="1">Sim</option>
                        </Select>
                    </GroupForm>

                    <GroupForm>
                        <Label>Código do Sisrev Brasil</Label>
                        <Input required={true} type="text" name="sisrevBrazilCode" placeholder="0000" onChange={(e: any) => {setSisrevBrazilCode(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Código do Sisrev LLC</Label>
                        <Input required={true} type="text" name="sisrevEuaCode" placeholder="0000" onChange={(e: any) => {setSisrevEuaCode(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm></GroupForm>

                    <ButtonSmall name="Cadastrar"/>
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