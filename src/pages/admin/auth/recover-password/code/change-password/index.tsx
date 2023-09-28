// assets
import React, { useEffect, useState } from "react";
import { Main, Card, ImageContainer, Form} from "./style";
import Image from "next/image";
import { useRouter } from "next/router";

// components
import Input from "@/components/Input";
import Title from "@/components/Title";
import ButtonLarge from "@/components/ButtonLarge";
import AlertDanger from "@/components/AlertDanger";

// api
import { useRecoverPassword } from "@/hooks/useRecoverPassword";
import Loader from "@/components/Loader";
import { getApiClient } from "@/api/axios";

export default function Code() {
  const router = useRouter();
  const [ password, setPassword ] = useState('');
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
  const [ alertMessage, setAlertMessage ] = useState('');
  const [ userIdIsEmptyLetsRedirect, setUserIdIsEmptyLetsRedirect ] = useState(false); // se não houve o id do user redirecionar para tela de verificação do código
  const [ redirect, setRedirect ] = useState(false); // redireciona para o login
  const [ loader, setLoader ] = useState(false);
  const { userId } = useRecoverPassword(); // Recupera o id do administrador após a verifição do código

  const handleForm =  async (e: any) => {
    e.preventDefault();
    setLoader(true);

    if (!userId) setUserIdIsEmptyLetsRedirect(true);

    if (password === passwordConfirmation) {
      const data = { 
        id: userId,
        password: password,
        password_confirmation: passwordConfirmation
      }

      try {
        const api = getApiClient(``);
        const response = await api.post('/admin/recover-password/code/change-password', data);
        setRedirect(true); // redireciona para o login apos alterar a senha
      } catch (error: any) {
        setAlertMessage(error?.response?.data?.message || "Ocorreu um erro.");
      } finally {
        setLoader(false);
      }
    } else {
      setLoader(false);
      setAlertMessage('As senhas não correspondem!');
    }
  }

  // redireciona para tela de confirmação de código
  useEffect(() => {
    if (userIdIsEmptyLetsRedirect) {
      router.push('/admin/auth/recover-password/code');
    }
  }, [userIdIsEmptyLetsRedirect]);

  // redireciona para o login
  useEffect(() => {
    if (redirect) {
      router.push('/admin/auth/login');
    }
  }, [redirect]);

  return (
    <Main>
        {/* Loader */}
        {loader && (
          <Loader/>
        )}
        {/* Alert */}
        {alertMessage && (
          <AlertDanger text={alertMessage}/>
        )}
       <Card>
          {/* Logo enco */}
          <ImageContainer>
            <Image 
              src="/images/enco.svg" 
              alt="Logo da encoparts" 
              width="114"
              height="28"
            />
          </ImageContainer>
          {/* title */}
          <Title>Redefinir senha</Title>
          {/* Formulario */}
          <Form onSubmit={handleForm}>
            {/* password */}
            <Input type="password" name="password" placeholder="Senha"onChange={(e: any) => setPassword(e.target.value)}/>
            {/* password confirmation */}
            <Input type="password" name="password_confirmation" placeholder="Confirme a senha"onChange={(e: any) => setPasswordConfirmation(e.target.value)}/>
            {/* submit */}
            <ButtonLarge>Redefinir senha</ButtonLarge>
          </Form>
       </Card>
    </Main>
  )
}