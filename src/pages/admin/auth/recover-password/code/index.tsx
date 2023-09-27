// assets
import React, { useEffect, useState } from "react";
import { Main, Card, ImageContainer, Form} from "./style";
import { useRouter } from "next/router";
import Image from "next/image";

// components
import Input from "@/components/Input";
import Title from "@/components/Title";
import ButtonLarge from "@/components/ButtonLarge";
import Paragraph from "@/components/Paragraph";
import AlertDanger from "@/components/AlertDanger";
import Loader from "@/components/Loader";

// api
import { useRecoverPassword } from "@/hooks/useRecoverPassword";
import { getApiClient } from "@/api/axios";

export default function Code() {
  const router = useRouter();
  const [ code, setCode ] = useState('');
  const [ alertMessage, setAlertMessage ] = useState('');
  const [ redirect, setRedirect ] = useState(false); // Adicione um estado para controlar o redirecionamento
  const [ loader, setLoader ] = useState(false); // Adicione um estado para mostrar o loader
  const { setUserId } = useRecoverPassword(); // Gancho da context api recover password

  const handleForm =  async (e: any) => {
    e.preventDefault();
    setLoader(true);

    const data = { 
      code: code 
    }
    
    try {
      const api = getApiClient(``);
      const response = await api.post('/admin/recover-password/code', data);
      setUserId(response?.data?.id_administrador);
      setRedirect(true);
    } catch (error) {
      setAlertMessage(error?.response?.data?.message || "Ocorreu um erro.");
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (redirect) {
      router.push('/admin/auth/recover-password/code/change-password');
    }
  }, [redirect]);

  return (
    <Main>
       <Card>
        {loader && (
          <Loader/>
        )}
        {alertMessage && (
          <AlertDanger text={alertMessage}/>
        )}
          <ImageContainer>
            <Image 
              src="/images/enco.svg" 
              alt="Logo da encoparts" 
              width="114"
              height="28"
            />
          </ImageContainer>
          <Title>Código de verificação </Title>
          <Paragraph>"Por favor, verifique o e-mail de redefinição de senha, onde você encontrará um código de seis dígitos."</Paragraph>
          <Form onSubmit={handleForm}>
            <Input type="text" name="code" placeholder="Código"onChange={(e: any) => setCode(e.target.value)}/>
            <ButtonLarge>Confirmar</ButtonLarge>
          </Form>
       </Card>
    </Main>
  )
}