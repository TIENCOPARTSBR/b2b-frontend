// assets
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { parseCookies } from "nookies";
import { 
  Main, 
  Card, 
  ImageContainer, 
  ForgetPassword, 
  Form 
} from "./style";

// component
import Input from "@/components/Input";
import Title from "@/components/Title";
import ButtonLarge from "@/components/ButtonLarge";
import Error from "@/components/Error";

// context
import { useAuth } from "@/hooks/auth";
import Loader from "@/components/Loader";
import Success from "@/components/Success";

// login
const Login = () => {
  const router = useRouter();  
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSucess] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);


  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoader(true);

    const data: any = {
      email: email,
      password: password
    }

    const response = await signIn(data);
     
    if (response) {
      setSucess('Login realizado com sucesso.')
      router.push('/admin');
      setLoader(false);
    } else {
      setLoader(false);
      setError('Acesso negado. Por favor, revise as informações de seu e-mail e senha e tente novamente.');
    }
  }

  // Esta função utiliza o hook useEffect para monitorar o estado 'error'. 
  // Sempre que o estado 'error' for atualizado, ela agendará uma ação para 
  // limpar o erro após 3 segundos, removendo assim qualquer mensagem de alerta.
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error]);

  return (
    <Main>
      {success && (<Success success={success}/>)}
      {error && (<Error error={error}/>)}
      {loader && (<Loader></Loader>)}
      <Card>
        <ImageContainer>
          <Image 
            src="/images/enco.svg" 
            alt="Logo da encoparts" 
            width="114"
            height="28"
          />
        </ImageContainer>

        <Title>Faça login com seu e-mail</Title>
        <Form onSubmit={handleLogin}>
          <Input type="email" required={true} name="mail" placeholder="E-mail"onChange={(e: any) => {setEmail(e.target.value)}}/>
          <Input type="password" required={true} name="password" placeholder="Senha"onChange={(e: any) => {setPassword(e.target.value)}}/>
          <ForgetPassword href="/admin/auth/recover-password">Forgot Password?</ForgetPassword>
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