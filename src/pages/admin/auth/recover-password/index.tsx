// assets
import React, { useEffect, useState } from "react";
import { Main, Card, ImageContainer, Form, ButtonLoggin } from "./style";
import Image from "next/image";
import { useRouter } from "next/router";

// components
import Input from "@/components/Input";
import Title from "@/components/Title";
import ButtonLarge from "@/components/ButtonLarge";
import Paragraph from "@/components/Paragraph";
import Loader from "@/components/Loader";
import Error from "@/components/Error";

// api
import { getApiClient } from "@/api/axios";

export default function RecoverPassword() {
   const router = useRouter();
   const [email, setMail] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [loader, setLoader] = useState<boolean>(false);
   const [redirect, setRedirect] = useState<boolean>(false);

   const handleForm = async (e: any) => {
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
         setError(error?.response?.data?.message);
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

   // Esta função utiliza o hook useEffect para monitorar o estado 'error'. 
   // Sempre que o estado 'error' for atualizado, ela agendará uma ação para 
   // limpar o erro após 3 segundos, removendo assim qualquer mensagem de alerta.
   useEffect(() => {
      setTimeout(() => {
         setError(null)
      }, 5000);
   }, [error])

   return (
      <Main>
         {loader && (<Loader />)}
         {error && (<Error error={error} />)}
         <Card>
            <ImageContainer>
               <Image
                  src="/images/enco.svg"
                  alt="Logo da encoparts"
                  width="114"
                  height="28"
               />
            </ImageContainer>

            <Title>Esqueci minha senha</Title>

            <Form onSubmit={handleForm}>
               <Input type="email" name="mail" required={true} placeholder="E-mail" onChange={(e: any) => setMail(e.target.value)} className={error ? 'error' : ''} />
               <Paragraph>Não esqueça de verificar a caixa de SPAM.</Paragraph>
               <ButtonLarge>Enviar e-mail de redefinição de senha</ButtonLarge>
               <ButtonLoggin href="/admin/auth/login">Fazer login</ButtonLoggin>
            </Form>
         </Card>
      </Main>
   )
}