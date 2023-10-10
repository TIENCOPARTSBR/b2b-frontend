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
} from "../../Styles/admin/login/style";

// component
import Input from "@/components/Input";
import Title from "@/components/Title";
import ButtonLarge from "@/components/ButtonLarge";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Success from "@/components/Success";

// context
import { useAuth } from "@/hooks/direct-distributor/auth";

// login
const Login = () => {
  const router = useRouter();  
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    setError(null);

    const data: any = {
      email: email,
      password: password
    }

    const response = await signIn(data);
     
    if (response) {
      setSuccess('Login successful.')
      router.push('/');
      setLoader(false);
    } else {
      setLoader(false);
      setError('Access denied. Please review your email and password information and try again.');
    }
  }

  // This function uses the useEffect hook to monitor the 'error' state. 
  // Whenever the 'error' state is updated, it schedules an action to 
  // clear the error after 3 seconds, thus removing any alert message.
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
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
            alt="Encoparts Logo" 
            width="114"
            height="28"
          />
        </ImageContainer>

        <Title>Login with your email</Title>
        <Form onSubmit={handleLogin}>
          <Input type="email" required={true} name="email" placeholder="Email" autoComplete="email" onChange={(e: any) => {setEmail(e.target.value)}}/>
          <Input type="password" required={true} name="password" placeholder="Password" autoComplete="password" onChange={(e: any) => {setPassword(e.target.value)}}/>
          <ForgetPassword href="/recover-password">Forgot Password?</ForgetPassword>
          <ButtonLarge>Log In</ButtonLarge>
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
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}