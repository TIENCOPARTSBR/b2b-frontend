// assets
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import Image from "next/image"

// style
import { Main, CardHeader, Group, ButtonAction } from "../../../Styles/admin/direct-distributor/style"

// components
import Breadcump from "@/components/Breadcump"
import Header from "@/components/Header"
import Title from "@/components/Title"
import LinkSmall from "@/components/LinkSmall"
import DataTable from "@/components/Datatable"
import Error from "@/components/Error"
import HeaderMobile from "@/components/HeaderMobile"

// api
import { getApiClient } from "@/api/axios"
import { ListHeaderAdmin } from "@/service/HeaderAdmin"


type DirectDistributor = {
   id: number
   name: string
   email: string
}
 
type DirectDistributorProps = {
   directDistributor: DirectDistributor[]
}

const breadcrumbs = [
   {
      name: "Home",
      link: "/admin",
   },
   {
      name: "Direct distributors",
      link: "/admin/direct-distributor",
   }
]

const DirectDistributor = ({directDistributor}: DirectDistributorProps) => {
   const router = useRouter() // Initializing the router
   const [error, setError] = useState<string | null>(null) // Initializing state for error messages

   // This function uses the useEffect hook to monitor the "error" state.
   // Whenever the "error" state is updated, it schedules an action to
   // clear the error after 3 seconds, effectively removing any alert message.
   useEffect(() => {
      setTimeout(() => {
         setError(null)
      }, 5000);
   }, [error])

   const [isModalOpen, setIsModalOpen] = useState(false) // Initializing state for the modal

   const HandleOpenModal = () => {
     setIsModalOpen(true) // Function to open the modal
   }
 
   const HandleCloseModal = () => {
     setIsModalOpen(false) // Function to close the modal
   }

   // Function that navigates to the edit page
   const handleEdit = (directDistributorId: number) => {
      router.push(`/admin/direct-distributor/${directDistributorId}`);
   };
   
   // DataTable columns
   const columns = [
      {
        Header: "Company",
        accessor: "name",
        width: "50%",
      },
      {
         Header: "Code Sisrev Brasil",
         accessor: "sisrev_brazil_code",
         width: "15%",
      },
      {
         Header: "code Sisrev EUA",
         accessor: "sisrev_eua_code",
         width: "15%",
      },
      {
         Header: "Actions",
         accessor: "action",
         width: "10%",
        Cell: ({ row }: any) => (
          <>
            <ButtonAction onClick={() => handleEdit(row.original.id)}>
              <Image src="/icons/edit.svg" width="18" height="18" alt="icon edit" />
            </ButtonAction>
          </>
        ),
      },
   ];

   return (
      <>
         {error && <Error error={error} />} {/* Error component */}
         <Header list={ListHeaderAdmin}/>
         <HeaderMobile list={ListHeaderAdmin}/>
         <Main>
            <CardHeader>
               <Group>
                  <Breadcump breadcump={breadcrumbs}/> {/* Breadcrumbs component */}
                  <Title>Direct Distributors</Title> {/* Title component */}
               </Group>

               <LinkSmall name="New direct distributor" link="/admin/direct-distributor/new" />  {/* Link to create a new user */}
            </CardHeader>

            <DataTable columns={columns} data={directDistributor} /> {/* DataTable component */}
         </Main>
      </>
   )
}

export default DirectDistributor;

export const getServerSideProps: GetServerSideProps<DirectDistributorProps> = async (ctx) => {
   const { ["adminAuth.token"]: token } = parseCookies(ctx); // Get the token saved in the authentication cookie

   if (!token) { // If the token does not exist, redirect the client to the login page
      return {
         redirect: {
            destination: "/admin/auth/login",
            permanent: false,
         }
      }
   }

   try {
      const api = getApiClient(ctx);
      const response = await api.get<DirectDistributor[]>("/admin/direct-distributor"); // API route to get all administrator users
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