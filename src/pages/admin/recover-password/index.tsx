// assets
import React, { useEffect, useState } from "react";
import { Main, Card, ImageContainer, Form, ButtonLoggin } from "../../../Styles/admin/recover-password/style";
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
import { getApiAdmin } from "@/api/axios";

export default function RecoverPassword() {
   const router = useRouter();
   const [email, setEmail] = useState<string | null>(null);
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
         const api = getApiAdmin(``);
         const response = await api.post('/admin/recover-password', data);
         setRedirect(true);
      } catch (error: any) {
         setError(error?.response?.data?.message);
      } finally {
         setLoader(false); // Disable the loader 
      }
   }

   // Redirect to the next page (step code)
   useEffect(() => {
      if (redirect) {
         router.push('/admin/recover-password/code');
      }
   }, [redirect]);

   // This function uses the useEffect hook to monitor the 'error' state. 
   // Whenever the 'error' state is updated, it schedules an action to 
   // clear the error after 3 seconds, removing any alert message.
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
                  alt="Encoparts logo"
                  width="114"
                  height="28"
               />
            </ImageContainer>

            <Title>Forgot my password</Title>

            <Form onSubmit={handleForm}>
               <Input type="email" name="email" required={true} placeholder="Email" onChange={(e: any) => setEmail(e.target.value)} className={error ? 'error' : ''} />
               <Paragraph>Don't forget to check your SPAM folder.</Paragraph>
               <ButtonLarge>Send password reset email</ButtonLarge>
               <ButtonLoggin href="/admin/login">Log in</ButtonLoggin>
            </Form>
         </Card>
      </Main>
   )
}