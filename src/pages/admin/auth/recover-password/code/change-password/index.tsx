// assets
import React, { useEffect, useState } from "react";
import { Main, Card, ImageContainer, Form } from "./style";
import Image from "next/image";
import { useRouter } from "next/router";

// components
import Input from "@/components/Input";
import Title from "@/components/Title";
import ButtonLarge from "@/components/ButtonLarge";
import AlertDanger from "@/components/AlertDanger";

// api
import { useRecoverPassword } from "@/hooks/recoverPassword";
import Loader from "@/components/Loader";
import { getApiClient } from "@/api/axios";
import Error from "@/components/Error";

export default function Code() {
   const router = useRouter()
   const [password, setPassword] = useState<string | null>(null)
   const [passwordConfirmation, setPasswordConfirmation] = useState<string | null>(null)
   const [error, setError] = useState<string | null>(null)
   const [userIdIsEmptyLetsRedirect, setUserIdIsEmptyLetsRedirect] = useState<boolean>(false) // se não houve o id do user redirecionar para tela de verificação do código
   const [redirect, setRedirect] = useState<boolean>(false) // redireciona para o login
   const [loader, setLoader] = useState<boolean>(false)
   const { userId } = useRecoverPassword() // Recupera o id do administrador após a verifição do código

   const handleForm = async (e: any) => {
      e.preventDefault()
      setLoader(true)

      if (!userId) setUserIdIsEmptyLetsRedirect(true)

      if (password === passwordConfirmation) { // verifica se as senhas são iguais 
         const data = {
            id: userId,
            password: password,
            password_confirmation: passwordConfirmation
         }

         try {
            const api = getApiClient(``)
            const response = await api.post('/admin/recover-password/code/change-password', data)
            setRedirect(true) // redireciona para o login apos alterar a senha
         } catch (error: any) {
            setError(error?.response?.data?.message || "Ocorreu um erro.")
         } finally {
            setLoader(false)
         }
      } else {
         setLoader(false)
         setError('As senhas não correspondem!')
      }
   }

   // redireciona para tela de confirmação de código
   useEffect(() => {
      if (userIdIsEmptyLetsRedirect) {
         router.push('/admin/auth/recover-password/code')
      }
   }, [userIdIsEmptyLetsRedirect])

   // redireciona para o login
   useEffect(() => {
      if (redirect) {
         router.push('/admin/auth/login')
      }
   }, [redirect])

   // Esta função utiliza o hook useEffect para monitorar o estado 'error'. 
	// Sempre que o estado 'error' for atualizado, ela agendará uma ação para 
	// limpar o erro após 3 segundos, removendo assim qualquer mensagem de alerta.
	useEffect(() => {
		setTimeout(() => {
			setError(null)
		}, 5000)
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

            <Title>Redefinir senha</Title>
            <Form onSubmit={handleForm}>
               <Input type="password" name="password" placeholder="Senha" onChange={(e: any) => setPassword(e.target.value)} />
               <Input type="password" name="password_confirmation" placeholder="Confirme a senha" onChange={(e: any) => setPasswordConfirmation(e.target.value)} />
               <ButtonLarge>Redefinir senha</ButtonLarge>
            </Form>
         </Card>
      </Main>
   )
}