// assets
import React, { useEffect, useState } from "react";
import { Main, Group, Form, GroupForm, Label } from "../../../../Styles/admin/users/new/style";
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
import HeaderMobile from "@/components/HeaderMobile";

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
                setError(error?.response?.data?.message || "Unable to register a new user.");
            } finally {
                setLoader(false);
            }

        } else {
            setError("Passwords don't match.");
            setLoader(false);
        }
    }

    const breadcump = [
        {
            name: 'Home',
            link: '/admin'
        }, {
            name: 'Users',
            link: '/admin/users'
        }, {
            name: 'New',
            link: '/admin/users/new'
        },
    ]

    return (
        <>
            {error && <Error error={error}/>} {/* Error component */}
            {loader && <Loader />} {/* Loading component */}
            <Header/>
            <HeaderMobile/>
            <Main>
                <Group>
                    <Breadcump breadcump={breadcump}/>
                    <Title>New user</Title>
                </Group>

                <Form onSubmit={hadleNewUser}>
                    <GroupForm>
                        <Label>Nome</Label>
                        <Input required={true} type="text" placeholder="Type your name" onChange={(e: any) => {setName(e.target.value)}}/>
                    </GroupForm>
                    
                    <GroupForm>
                        <Label>Email</Label>
                        <Input required={true} type="email" placeholder="Type your e-mail" onChange={(e: any) => {setEmail(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Password</Label>
                        <Input required={true} type="password" placeholder="Type your password" onChange={(e: any) => {setPassword(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Confirm the Password</Label>
                        <Input required={true} type="password" placeholder="Type your password" onChange={(e: any) => {setPasswordConfirmation(e.target.value)}}/>
                    </GroupForm>

                    <ButtonSmall name="Create new user"/>
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