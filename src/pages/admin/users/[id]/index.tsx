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
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import ModalToDelete from "@/components/ModalToDelete";

const NewUser = ({user}: any) => {
    const router = useRouter();
    const userId = router?.query?.id;
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [alert, setAlert] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [loader, setLoader] = useState(false);

    const hadleUpdateUser = async (e: any) => {
        e.preventDefault();
        setLoader(true);

        if (password === passwordConfirmation) {
            // Se a senha for vazia
            const data = {
                name: name,
                email: email,
            };
            
            if (password !== "") {
                data.password = password;
            }
            
            console.log(data);
            try {
                const api = getApiClient(``);
                const response = await api.post('/admin/user/'+ userId, data);
                console.log(response);
                setRedirect(true);
              } catch (error) {
                setAlert(error?.response?.data?.message || "Não foi possível atualizar o usuário.");
              } finally {
                setLoader(false);
              }

        } else {
            setAlert('As senhas não conferem.')
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
            name: 'Editar',
            link: '/admin/users/edit'
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
                    <Title>Editar usuário</Title>
                </Group>

                <Form onSubmit={hadleUpdateUser}>
                    <GroupForm>
                        <Label>Nome</Label>
                        <Input required={true} type="text" name="name" placeholder="Digite seu nome" value={name} onChange={(e: any) => {setName(e.target.value)}}/>
                    </GroupForm>
                    
                    <GroupForm>
                        <Label>E-mail</Label>
                        <Input required={true} type="email" name="email" placeholder="Digite seu e-mail" value={email} onChange={(e: any) => {setEmail(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Senha</Label>
                        <Input required={false} type="password" name="password" placeholder="Digite sua senha" onChange={(e: any) => {setPassword(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Senha</Label>
                        <Input required={false} type="password" name="password" placeholder="Digite sua senha" onChange={(e: any) => {setPasswordConfirmation(e.target.value)}}/>
                    </GroupForm>

                    <ButtonSmall name="Atualizar"/>
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

    try {
        // Obtenha o userId dos parâmetros da rota
        const userId = ctx?.params?.id;
   
        // Api
        const api = getApiClient(ctx);
        const response = await api.get('/admin/user/'+ userId);
        const user = response.data;
     
        return {
            props: {
                user
            }
        }

    } catch (error) {
        return {
            props: {
                user: null
            }
        }
    }
}