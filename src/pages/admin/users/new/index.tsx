// assets
import React, { useEffect, useState } from "react";
import { Main, Group, Form, GroupForm, Label } from "./style";
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
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [alert, setAlert] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [loader, setLoader] = useState(false);

    const hadleNewUser = async (e: any) => {
        e.preventDefault();
        setLoader(true);

        if (password === passwordConfirmation) {
            const data = {
                name: name,
                email: email,
                password: password,
            }

            try {
                const api = getApiClient(``);
                const response = await api.post('/admin/user', data);
                setRedirect(true);
              } catch (error) {
                setAlert(error?.response?.data?.message || "Não foi possível cadastar um novo usuário.");
              }

        } else {
            setAlert('As senhas não conferem.');
            setLoader(false);
        }
    }

    const breadcump = [
        {
            name: 'Home',
            link: '/admin'
        }, {
            name: 'Usuários',
            link: '/admin/users'
        }, {
            name: 'Novo',
            link: '/admin/users/new'
        },
    ]

    useEffect(() => {
        if (redirect) {
            router.push('/admin/users');
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
                    <Title>Novo usuário</Title>
                </Group>

                <Form onSubmit={hadleNewUser}>
                    <GroupForm>
                        <Label>Nome</Label>
                        <Input required={true} type="text" name="name" placeholder="Digite seu nome" onChange={(e: any) => {setName(e.target.value)}}/>
                    </GroupForm>
                    
                    <GroupForm>
                        <Label>E-mail</Label>
                        <Input required={true} type="email" name="email" placeholder="Digite seu e-mail" onChange={(e: any) => {setEmail(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Senha</Label>
                        <Input required={true} type="password" name="password" placeholder="Digite sua senha" onChange={(e: any) => {setPassword(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Senha</Label>
                        <Input required={true} type="password" name="password" placeholder="Digite sua senha" onChange={(e: any) => {setPasswordConfirmation(e.target.value)}}/>
                    </GroupForm>

                    <ButtonSmall name="Cadastrar"/>
                </Form>
            </Main>
        </>
    )
}

export default NewUser;