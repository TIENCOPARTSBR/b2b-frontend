import React from "react";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { Main } from "./style";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import HeaderMobile from "@/components/HeaderMobile";

const Dashboard = () => {
   return (
      <>
         <Header />
         <HeaderMobile />
         <Main>
            <Title>Administrator Module</Title>
         </Main>
      </>
   )
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
   const { ['adminAuth.token']: token } = parseCookies(ctx);

   if (!token) {
      return {
         redirect: {
            destination: '/admin/auth/login',
            permanent: false,
         }
      }
   }

   return {
      props: {}
   }
}