// assets
import React, { useEffect, useState } from "react";
import { Main, Card, ImageContainer, Form, ButtonLoggin} from "./style";
import Image from "next/image";
import { useRouter } from "next/router";

// components
import Input from "@/components/Input";
import Title from "@/components/Title";
import ButtonLarge from "@/components/ButtonLarge";
import Paragraph from "@/components/Paragraph";
import AlertDanger from "@/components/AlertDanger";
import Loader from "@/components/Loader";

// api
import { getApiClient } from "@/api/axios";

export default function RecoverPassword() {
  const router = useRouter();
  const [email, setMail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleForm =  async (e: any) => {
    e.preventDefault();
    setLoader(true);

    const data = {
      email: email
    }

    try {
      const api = getApiClient(``);
      const response = await api.post('/admin/recover-password', data);
      setRedirect(true);
    } catch (error: any) {
      setAlertMessage(error?.response?.data?.message);
    } finally {
      setLoader(false); // Desabilita o loader 
    }
  }

  // Redireciona para próxima página (step code)
  useEffect(() => {
    if (redirect) {
      router.push('/admin/auth/recover-password/code');
    }
  }, [redirect]);

  return (
    <Main>
        {/* loader */}
        {loader && (
          <Loader/>
        )}
        {/* alerta */}
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
          {/* Title */}
          <Title>Esqueci minha senha</Title>
          {/* Form */}
          <Form onSubmit={handleForm}>
            {/* Email */}
            <Input type="email" name="mail" required={true} placeholder="E-mail"onChange={(e: any) => setMail(e.target.value)}/>
            {/* Paragraph */}
            <Paragraph>Não esqueça de verificar a caixa de SPAM.</Paragraph>
            {/* Enviar e-mail */}
            <ButtonLarge>Enviar e-mail de redefinição de senha</ButtonLarge>
            {/* Login */}
            <ButtonLoggin href="/admin/auth/login">Fazer login</ButtonLoggin>
          </Form>
       </Card>
    </Main>
  )
}