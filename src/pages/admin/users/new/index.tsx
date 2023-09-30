// assets
import React, { useEffect, useState } from "react";
import { Main, Group, Form, GroupForm, Label } from "./style";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

// components
import Header from "@/components/Header";
import Breadcump from "@/components/Breadcump";
import Title from "@/components/Title";
import Input from "@/components/Input";
import ButtonSmall from "@/components/ButtonSmall";
import Error from "@/components/Error";
import Loader from "@/components/Loader";

// api 
import { getApiClient } from "@/api/axios";

const NewUser = () => {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setError(null)
        }, 5000);
    }, [error])

    useEffect(() => {
        (redirect) ? router.push('/admin/users') : ''
    }, [redirect])

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
                await api.post('/admin/user', data);
                setRedirect(true);
            } catch (error: any) {
                setError(error?.response?.data?.message || "Não foi possível cadastar um novo usuário.");
            } finally {
                setLoader(false);
            }

        } else {
            setError('Senhas não coincidem.');
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

    return (
        <>
            {error && <Error error={error}/>} {/* Error component */}
            {loader && <Loader />} {/* Loading component */}
            <Header/>
            <Main>
                <Group>
                    <Breadcump breadcump={breadcump}/>
                    <Title>Novo usuário</Title>
                </Group>

                <Form onSubmit={hadleNewUser}>
                    <GroupForm>
                        <Label>Nome</Label>
                        <Input required={true} type="text" placeholder="Digite seu nome" onChange={(e: any) => {setName(e.target.value)}}/>
                    </GroupForm>
                    
                    <GroupForm>
                        <Label>E-mail</Label>
                        <Input required={true} type="email" placeholder="Digite seu e-mail" onChange={(e: any) => {setEmail(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Senha</Label>
                        <Input required={true} type="password" placeholder="Digite sua senha" onChange={(e: any) => {setPassword(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Confirme a senha</Label>
                        <Input required={true} type="password" placeholder="Digite sua senha" onChange={(e: any) => {setPasswordConfirmation(e.target.value)}}/>
                    </GroupForm>

                    <ButtonSmall name="Criar novo usuário"/>
                </Form>
            </Main>
        </>
    )
}

export default NewUser;

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

    return {
        props: {}
    }
}