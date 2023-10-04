// assets
import React, { useEffect, useState } from "react"
import { Main, Card, ImageContainer, Form } from "../../../../../Styles/admin/auth/recover-password/code/change-password/style"
import Image from "next/image"
import { useRouter } from "next/router"

// components
import Input from "@/components/Input"
import Title from "@/components/Title"
import ButtonLarge from "@/components/ButtonLarge"

// api
import { useRecoverPassword } from "@/hooks/direct-distributor/recoverPassword"
import Loader from "@/components/Loader"
import { getApiClient } from "@/api/axios"
import Error from "@/components/Error"

export default function Code() {
   const router = useRouter()
   const [password, setPassword] = useState<string | null>(null)
   const [passwordConfirmation, setPasswordConfirmation] = useState<string | null>(null)
   const [error, setError] = useState<string | null>(null)
   const [userIdIsEmptyLetsRedirect, setUserIdIsEmptyLetsRedirect] = useState<boolean>(false) // if there is no user id, redirect to the code verification screen
   const [redirect, setRedirect] = useState<boolean>(false) // redirect to login
   const [loader, setLoader] = useState<boolean>(false)
   const { userId } = useRecoverPassword() // Retrieve the administrator's id after code verification

   const handleForm = async (e: any) => {
      e.preventDefault()
      setLoader(true)
      setError(null)

      if (!userId) setUserIdIsEmptyLetsRedirect(true)

      if (password === passwordConfirmation) { // Check if passwords match
         const data = {
            id: userId,
            password: password,
            password_confirmation: passwordConfirmation
         }

         try {
            const api = getApiClient(``);
            await api.post('/recover-password/code/change-password', data)
            setRedirect(true) // Redirect to login after changing the password
         } catch (error: any) {
            setError(error?.response?.data?.message || "An error occurred.")
         } finally {
            setLoader(false)
         }
      } else {
         setLoader(false)
         setError('Passwords do not match!')
      }
   }

   // Redirect to the code verification screen
   useEffect(() => {
      if (userIdIsEmptyLetsRedirect) {
         router.push('/auth/recover-password/code')
      }
   }, [userIdIsEmptyLetsRedirect])

   // Redirect to login
   useEffect(() => {
      if (redirect) {
         router.push('/auth/login')
      }
   }, [redirect])

   // This function uses the useEffect hook to monitor the 'error' state.
   // Whenever the 'error' state is updated, it schedules an action to
   // clear the error after 3 seconds, removing any alert message.
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
                  alt="Encoparts logo"
                  width="114"
                  height="28"
               />
            </ImageContainer>

            <Title>Reset Password</Title>
            <Form onSubmit={handleForm}>
               <Input type="password" name="password" placeholder="Password" onChange={(e: any) => setPassword(e.target.value)} />
               <Input type="password" name="password_confirmation" placeholder="Confirm Password" onChange={(e: any) => setPasswordConfirmation(e.target.value)} />
               <ButtonLarge>Reset Password</ButtonLarge>
            </Form>
         </Card>
      </Main>
   )
}