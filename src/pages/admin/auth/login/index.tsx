// assets
import React, { useState } from "react";
import { Main, Card, ImageContainer, ForgetPassword, Form } from "./style";
import Image from "next/image";
import { useRouter } from "next/router";

// component
import Input from "@/components/Input";
import Title from "@/components/Title";
import ButtonLarge from "@/components/ButtonLarge";
import AlertDanger from "@/components/AlertDanger";

// context
import { useAuth } from "@/hooks/auth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const Login = () => {
  const router = useRouter();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ alert, setAlert ] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    }

    const response = await signIn(data);
     
    if (response) {
      router.push('/admin');
    } else {
      setAlert('Não foi possível fazer login, verifique seu e-mail e senha.')
    }
  }

  return (
    <Main>
      {alert && (
        <AlertDanger text={alert}/>
      )}
      <Card>
        {/* logo enco */}
        <ImageContainer>
          <Image 
            src="/images/enco.svg" 
            alt="Logo da encoparts" 
            width="114"
            height="28"
          />
        </ImageContainer>
        {/* title */}
        <Title>Faça login com seu e-mail</Title>
        <Form onSubmit={handleLogin}>
          {/* email */}
          <Input type="email" required={true} name="mail" placeholder="E-mail"onChange={(e: any) => {setEmail(e.target.value)}}/>
          {/* password */}
          <Input type="password" required={true} name="password" placeholder="Senha"onChange={(e: any) => {setPassword(e.target.value)}}/>
          {/* forget password */}
          <ForgetPassword href="/admin/auth/recover-password">Forgot Password?</ForgetPassword>
          {/* submit */}
          <ButtonLarge>Entrar</ButtonLarge>
        </Form>
      </Card>
    </Main>
  )
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['adminAuth.token']: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}