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
import Loader from "@/components/Loader";
import Error from "@/components/Error";

// context
import { useRecoverPassword } from "@/hooks/recoverPassword";
import { getApiClient } from "@/api/axios";

// step verify code
export default function Code() {
	const router = useRouter() // router
	const { setUserId } = useRecoverPassword() // Gancho da context api recover password
	const [code, setCode] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [redirect, setRedirect] = useState<boolean | null>(false) // Adicione um estado para controlar o redirecionamento
	const [loader, setLoader] = useState<boolean | null>(false) // Adicione um estado para mostrar o loader

	const handleForm =  async (e: any) => {
		e.preventDefault()
		setLoader(true)

		const data = { 
			code: code 
		}
		
		try {
			const api = getApiClient(``)
			const response = await api.post('/admin/recover-password/code', data)
			setUserId(response?.data?.id_administrador) // armazena o id do usuário no context
			setRedirect(true) // redireciona para próxima página
		} catch (error: any) {
			setError(error?.response?.data?.message || "Ocorreu um erro.")
		} finally {
			setLoader(false)
		}
	}

	// Esta função utiliza o hook useEffect para monitorar o estado 'redirect'. 
	// Quando o estados 'redirect' for modifica, será redirecionado para a próxima etapa.
	useEffect(() => {
		if (redirect) {
			router.push('/admin/auth/recover-password/code/change-password')
		}
	}, [redirect])

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
			<Card>
				{loader && (<Loader/>)}
				{error && (<Error error={error}/>)}
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