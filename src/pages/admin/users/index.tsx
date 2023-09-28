// assets
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Image from "next/image";

// style
import { Main, CardHeader, Group, ButtonAction } from "./style";

// components
import Breadcump from "@/components/Breadcump";
import Header from "@/components/Header";
import Title from "@/components/Title";
import LinkSmall from "@/components/LinkSmall";
import DataTable from "@/components/Datatable";

// api
import { getApiClient } from "@/api/axios";
import Loader from '@/components/Loader';
import AlertDanger from '@/components/AlertDanger';
import ModalToDelete from '@/components/ModalToDelete';

type User = {
   id: number;
   name: string;
   email: string;
};
 
type UserProps = {
   user: User[];
};

const Users = ({user}: UserProps) => {
   const router = useRouter();
   const [alertWarning, setAlertWarning] = useState<string | null>(null);
   const [loader, setLoader] = useState(false);
   const [userIdToDelete, setUserIdToDelete] = useState(0);

   useEffect(() => {
      if (alertWarning) {
         const timer = setTimeout(() => {
            setAlertWarning(null);
         }, 4000);

         return () => clearTimeout(timer);
      }
   }, [alertWarning]);

   const breadcrumbs = [
   {
      name: 'Home',
      link: '/admin',
   },
   {
      name: 'Usuários',
      link: '/admin/users',
   },
   {
      name: 'Novo',
      link: '/admin/users',
   },
   ];

   const handleEdit = (userId: number) => {
      router.push(`/admin/users/${userId}`);
   };

   const handleRemove = async (userId: number) => {
      setLoader(true);
      setIsModalOpen(true);
   
      try {
         const api = getApiClient('');
         await api.delete(`/admin/user/${userId}`);
         router.push('/admin/users');
      } catch (error: any) {
         setAlertWarning(error?.response?.data);
      } finally {
         setLoader(false);
         handleCloseModal();
      }
   };
   
   const columns = [
      {
        Header: 'Id',
        accessor: 'id',
        width: 50,
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 200,
      },
      {
        Header: 'E-mail',
        accessor: 'email',
        width: 400,
      },
      {
        Header: 'Ação',
        accessor: 'action',
        width: 50,
        Cell: ({ row }: any) => (
          <>
            <ButtonAction onClick={() => handleEdit(row.original.id)}>
              <Image src="/icons/edit.svg" width="18" height="18" alt="icon edit" />
            </ButtonAction>
  
            <ButtonAction onClick={() => {handleOpenModal(), setUserIdToDelete(row.original.id)}}>
              <Image src="/icons/trash.svg" width="18" height="18" alt="icon edit" />
            </ButtonAction>
          </>
        ),
      },
   ];

   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleOpenModal = () => {
     setIsModalOpen(true);
   };
 
   const handleCloseModal = () => {
     setIsModalOpen(false);
   };

   const onConfirme = () => {
      handleRemove(userIdToDelete);
   }

   return (
      <>
         <ModalToDelete show={isModalOpen} onHide={handleCloseModal} onConfirm={onConfirme}/>
         {alertWarning && <AlertDanger text={alertWarning} />}
         {loader && <Loader />}
         <Header />
         <Main>
            <CardHeader>
               <Group>
                  <Breadcump breadcump={breadcrumbs}/>
                  <Title>Usuários</Title>
               </Group>

               <LinkSmall name="Novo usuário" link="/admin/users/new" />
            </CardHeader>

            <DataTable columns={columns} data={user} />
         </Main>
      </>
   )
}

export default Users;

export const getServerSideProps: GetServerSideProps<UserProps> = async (ctx) => {
   const { ['adminAuth.token']: token } = parseCookies(ctx);

   if (!token) {
      return {
         redirect: {
            destination: '/admin/auth/login',
            permanent: false,
         }
      }
   }

   try {
      const api = getApiClient(ctx);
      const response = await api.get<User[]>('/admin/user');
      const user = response.data;

      return {
         props: {
            user,
         },
      };
   } catch (error) {
      return { 
         props: {
            user: []
         }
      }
   }
}