// assets
import React, { useEffect, useState } from "react"
import { Main, Group, Form, GroupForm, Label } from "../../../Styles/admin/users/edit/style"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { GetServerSideProps } from "next"

// components
import Header from "@/components/DirectDistributor/Header"
import Breadcump from "@/components/Breadcump"
import Title from "@/components/Title"
import Input from "@/components/Input"
import ButtonSmall from "@/components/ButtonSmall"
import Loader from "@/components/Loader"

// api 
import { getApiDirectDistributor } from "@/api/direct-distributor/axios"
import Error from "@/components/Error"
import HeaderMobile from "@/components/DirectDistributor/HeaderMobile"

type TypeData = {
    name: string | null
    email: string | null
    password?: string | null
}

const EditUser = ({user}: any) => {
    const router = useRouter()
    const userId = router?.query?.id
    const [name, setName] = useState<string>(user?.name)
    const [email, setEmail] = useState<string>(user?.email)
    const [password, setPassword] = useState<string>("")
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [redirect, setRedirect] = useState(false)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setError(null)
        }, 5000)
    }, [error])
    
    useEffect(() => {
        (redirect) ? router.push('/users') : ''
    }, [redirect])

    const hadleUpdateUser = async (e: any) => {
        setError(null)
        e.preventDefault()
        setLoader(true)

        if (password === passwordConfirmation) {
            // Se a senha for vazia
            const data: TypeData = {
                name: name,
                email: email,
            };
            
            (password !== "") ? data.password = password : ''
            
            try {
                const api = getApiDirectDistributor(``)
                await api.put('/user/'+ userId, data)
                setRedirect(true)
              } catch (error: any) {
                setError(error?.response?.data?.message || "Unable to update user.")
              } finally {
                setLoader(false)
              }

        } else {
            setLoader(false)
            setError("Passwords don't match.")
        }
    }

    const breadcump = [
        {
            name: 'Home',
            link: '/'
        }, {
            name: 'Users',
            link: '/users'
        }, {
            name: 'Edit',
            link: '/users/edit'
        },
    ]

    return (
        <>
            <Header/>
            <HeaderMobile/>

            {loader && (<Loader></Loader>)}
            {error && (<Error error={error}/>)}

            <Main>
                <Group>
                    <Breadcump breadcump={breadcump}/>
                    <Title>Edit User</Title>
                </Group>

                <Form onSubmit={hadleUpdateUser}>
                    <GroupForm>
                        <Label>Nome</Label>
                        <Input required={true} type="text" placeholder="Type your name" value={name} onChange={(e: any) => {setName(e.target.value)}}/>
                    </GroupForm>
                    
                    <GroupForm>
                        <Label>Email</Label>
                        <Input required={true} type="email" placeholder="Type your e-mail" value={email} onChange={(e: any) => {setEmail(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Password</Label>
                        <Input required={false} type="password" placeholder="Type your password" onChange={(e: any) => {setPassword(e.target.value)}}/>
                    </GroupForm>

                    <GroupForm>
                        <Label>Confirm the Password</Label>
                        <Input required={false} type="password" placeholder="Type your password" onChange={(e: any) => {setPasswordConfirmation(e.target.value)}}/>
                    </GroupForm>

                    <ButtonSmall name="Update" />
                </Form>
            </Main>
        </>
    )
}

export default EditUser;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['directDistributorAuth.token']: token } = parseCookies(ctx);

    if (!token) {
       return {
          redirect: {
             destination: '/login',
             permanent: false,
          }
       }
    }

    try {
        // Obtenha o userId dos parâmetros da rota
        const userId = ctx?.params?.id;
   
        // Api
        const api = getApiDirectDistributor(ctx);
        const response = await api.get('/user/'+ userId);
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