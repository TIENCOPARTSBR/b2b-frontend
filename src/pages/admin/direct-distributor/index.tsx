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

type DirectDistributor = {
   id: number;
   name: string;
   email: string;
};
 
type DirectDistributorProps = {
   directDistributor: DirectDistributor[];
};

const DirectDistributor = ({directDistributor}: DirectDistributorProps) => {
   const router = useRouter();
   const [alertWarning, setAlertWarning] = useState<string | null>(null);
   const [loader, setLoader] = useState(false);
   const [directDistributorIdToDelete, setDirectDistributorIdToDelete] = useState(0);

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
      name: 'Distribuidores diretos',
      link: '/admin/direct-distributor',
   },
   {
      name: 'Novo',
      link: '/admin/direct-distributor',
   },
   ];

   const handleEdit = (directDistributorId: number) => {
      router.push(`/admin/direct-distributor/${directDistributorId}`);
   };

   const handleRemove = async (directDistributorId: number) => {
      setLoader(true);
      setIsModalOpen(true);
   
      try {
         const api = getApiClient('');
         await api.delete(`/admin/direct-distributor/${directDistributorId}`);
         router.push('/admin/direct-distributor');
      } catch (error) {
         setAlertWarning(error?.response?.data);
      } finally {
         setLoader(false);
         handleCloseModal();
      }
   };
   
   const columns = [
      {
        Header: 'Empresa',
        accessor: 'name',
        width: '50%',
      },
      {
         Header: 'Sisrev Brasil',
         accessor: 'sisrev_brazil_code',
         width: '10%',
      },
      {
         Header: 'Sisrev EUA',
         accessor: 'sisrev_eua_code',
         width: '10%',
      },
      {
         Header: 'Criado',
         accessor: 'created_at',
         width: '10%',
      },
      {
         Header: 'Ação',
         accessor: 'action',
         width: '10%',
        Cell: ({ row }) => (
          <>
            <ButtonAction onClick={() => handleEdit(row.original.id)}>
              <Image src="/icons/edit.svg" width="18" height="18" alt="icon edit" />
            </ButtonAction>
  
            <ButtonAction onClick={() => {handleOpenModal(), setDirectDistributorIdToDelete(row.original.id)}}>
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
      handleRemove(directDistributorIdToDelete);
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
                  <Title>Distribuidores Diretos</Title>
               </Group>

               <LinkSmall name="Novo distribuidor direto" link="/admin/direct-distributor/new" />
            </CardHeader>

            <DataTable columns={columns} data={directDistributor} />
         </Main>
      </>
   )
}

export default DirectDistributor;

export const getServerSideProps: GetServerSideProps<DirectDistributorProps> = async (ctx) => {
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
      const response = await api.get<DirectDistributor[]>('/admin/direct-distributor');
      const directDistributor = response.data;

      return {
         props: {
            directDistributor,
         }
      };
   } catch (error) {
      return { 
         props: {
            directDistributor: []
         }
      }
   }
}