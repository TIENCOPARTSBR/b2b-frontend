// assets
import React, { useEffect, useState } from "react";
import { Main, Card, ImageContainer, Form } from "../../../../Styles/admin/recover-password/code/style";
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
import { getApiAdmin } from "@/api/axios";

// step verify code
export default function Code() {
   const router = useRouter(); // router
   const { setUserId } = useRecoverPassword(); // Recover password context hook
   const [code, setCode] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [redirect, setRedirect] = useState<boolean | null>(false); // Add state to control redirection
   const [loader, setLoader] = useState<boolean | null>(false); // Add state to show loader

   const handleForm = async (e: any) => {
      e.preventDefault();
      setLoader(true);

      const data = {
         code: code,
      };

      try {
         const api = getApiAdmin(``);
         const response = await api.post('/admin/recover-password/code', data);
         setUserId(response?.data?.id_administrador); // Store user id in context
         setRedirect(true); // Redirect to the next page
      } catch (error: any) {
         setError(error?.response?.data?.message || "An error occurred.");
      } finally {
         setLoader(false);
      }
   }

   // This function uses the useEffect hook to monitor the 'redirect' state.
   // When the 'redirect' state is modified, it will be redirected to the next step.
   useEffect(() => {
      if (redirect) {
         router.push('/admin/recover-password/code/change-password');
      }
   }, [redirect]);

   // This function uses the useEffect hook to monitor the 'error' state.
   // Whenever the 'error' state is updated, it schedules an action to
   // clear the error after 3 seconds, removing any alert message.
   useEffect(() => {
      setTimeout(() => {
         setError(null);
      }, 5000);
   }, [error]);

   return (
      <Main>
         <Card>
            {loader && (<Loader />)}
            {error && (<Error error={error} />)}

            <ImageContainer>
               <Image
                  src="/images/enco.svg"
                  alt="Encoparts logo"
                  width="114"
                  height="28"
               />
            </ImageContainer>

            <Title>Verification Code</Title>

            <Paragraph>"Please check the password reset email, where you will find a six-digit code."</Paragraph>
            
            <Form onSubmit={handleForm}>
               <Input type="text" name="code" placeholder="Code" onChange={(e: any) => setCode(e.target.value)} />
               <ButtonLarge>Confirm</ButtonLarge>
            </Form>
         </Card>
      </Main>
   )
}