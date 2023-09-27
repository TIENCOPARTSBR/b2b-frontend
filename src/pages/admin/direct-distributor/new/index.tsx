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

const NewUser = () => {
    // router
    const router = useRouter();
    // form  
    const [name, setName] = useState(''); // nome da empresa
    const [allowQuotation, setAllowQuotation] = useState(''); // permitir cotações
    const [allowPartner, setAllowPartner] = useState(''); // permitir parceiros
    const [sisrevBrazilCode, setSisrevBrazilCode] = useState(''); // código do cliente no sisrev brasil
    const [sisrevEuaCode, setSisrevEuaCode] = useState(''); // código do cliente no sisrev llc
    // functions  
    const [alert, setAlert] = useState(''); // alerta de erro
    const [redirect, setRedirect] = useState(false); // redirecionamento após conclusão 
    const [loader, setLoader] = useState(false); // tela de carregamento

    // função que envia um novo distribuidor para API
    const handleNewDirectDistributor = async (e: any) => {
        e.preventDefault();
        setLoader(true);

        const data = {
            name: name,
            allow_quotation: allowQuotation,
            allow_partner: allowPartner,
            sisrev_brazil_code: sisrevBrazilCode,
            sisrev_eua_code: sisrevEuaCode,
        }

        console.log(data);

        try {
            await getApiClient(``).post('/admin/direct-distributor', data); // envia os dados para API
            setRedirect(true); // ativa o redirecionamento
        } catch (error) {
            setAlert(
                error?.response?.data?.message || "Não foi possível cadastar um novo distribuidor direto."
            ); // alerta de erro
        } finally {
            setLoader(false); // fecha a tela de carregamento
        }
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

    useEffect(() => {
        if (redirect) {
            router.push('/admin/direct-distributor');
        }
    })

    return (
        <>
            <Header/>
            {loader && (
                <Loader></Loader>
            )}
            {alert && (
                <AlertDanger text={alert}/>
            )}
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

export default NewUser;