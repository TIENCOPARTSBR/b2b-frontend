// assets
import React, { useState, useEffect } from "react" // Importing necessary libraries
import Image from "next/image"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"

// style
import { Main, CardHeader, Group, ButtonAction } from "../../Styles/admin/users/style" // Importing styles

// components
import Breadcump from "@/components/Breadcump" // Importing the "Breadcump" component
import Header from "@/components/DirectDistributor/Header" // Importing the "Header" component
import Title from "@/components/Title" // Importing the "Title" component
import LinkSmall from "@/components/LinkSmall" // Importing the "LinkSmall" component
import DataTable from "@/components/Datatable" // Importing the "DataTable" component
import Loader from "@/components/Loader" // Importing the "Loader" component
import ModalToDelete from "@/components/ModalToDelete" // Importing the "ModalToDelete" component
import Error from "@/components/Error" // Importing the "Error" component
import HeaderMobile from "@/components/DirectDistributor/HeaderMobile"

// api
import { getApiDirectDistributor } from "@/api/direct-distributor/axios"

type User = {
   id: number
   name: string
   email: string
}
 
type UserProps = {
   user: User[]
}

const breadcrumbs = [
   {
      name: "Home",
      link: "/admin",
   },
   {
      name: "Users",
      link: "/admin/users",
   }
]

const Users = ({user}: UserProps) => {
   const router = useRouter() // Initializing the router
   const [userIdToDelete, setUserIdToDelete] = useState<number>(0) // Initializing state for user ID to delete
   const [error, setError] = useState<string | null>(null) // Initializing state for error messages
   const [loader, setLoader] = useState<boolean>(false) // Initializing state for loader

   // This function uses the useEffect hook to monitor the 'error' state.
   // Whenever the 'error' state is updated, it schedules an action to
   // clear the error after 3 seconds, effectively removing any alert message.
   useEffect(() => {
      setTimeout(() => {
         setError(null)
      }, 5000);
   }, [error])

   const [isModalOpen, setIsModalOpen] = useState(false); // Initializing state for the modal

   const HandleOpenModal = () => {
     setIsModalOpen(true) // Function to open the modal
   };
 
   const HandleCloseModal = () => {
     setIsModalOpen(false) // Function to close the modal
   };

   // If the user clicks on delete in the modal, send the user ID to the deletion function
   const HandleUserDeletionConfirmation = () => {
      UserDeletion(userIdToDelete);
   }

   // Function that navigates to the edit page
   const handleEdit = (userId: number) => {
      router.push(`/users/${userId}`)
   }

   // Function that performs user deletion
   const UserDeletion = async (userId: number) => {
      setLoader(true); // Display the loading screen
      setIsModalOpen(true) // Open the deletion modal 
   
      try {
         const api = getApiDirectDistributor(``)
         await api.delete(`/user/${userId}`) // API route for deletion
         router.push("/users") // Redirect to the same page after deletion
      } catch (error: any) {
         setError(error?.response?.data?.message)
      } finally {
         setLoader(false) // Remove the loading screen
         HandleCloseModal() // Close the modal
      }
   }
   
   // DataTable columns
   const columns = [
      {
        Header: "Id",
        accessor: "id",
        width: 50,
      },
      {
        Header: "Name",
        accessor: "name",
        width: 200,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 400,
      },
      {
        Header: "Actions",
        accessor: "action",
        width: 50,
        Cell: ({ row }: any) => (
          <>
            {/* <!-- Edit button --> */}
            <ButtonAction onClick={() => handleEdit(row.original.id)}>
              <Image src="/icons/edit.svg" width="18" height="18" alt="icon edit" />
            </ButtonAction>
  
            {/* <!-- Delete button --> */}
            <ButtonAction onClick={() => {HandleOpenModal(), setUserIdToDelete(row.original.id)}}>
              <Image src="/icons/trash.svg" width="18" height="18" alt="icon edit" />
            </ButtonAction>
          </>
        ),
      }
   ]

   return (
      <>
         <ModalToDelete show={isModalOpen} onHide={HandleCloseModal} onConfirm={HandleUserDeletionConfirmation}/> {/* Modal component */}
         {error && <Error error={error}/>} {/* Error component */}
         {loader && <Loader />} {/* Loading component */}

         <Header/>
         <HeaderMobile/>

         <Main>
            <CardHeader>
               <Group>
                  <Breadcump breadcump={breadcrumbs}/> {/* Breadcrumbs component */}
                  <Title>Users</Title> {/* Title component */}
               </Group>

               <LinkSmall name="New user" link="/users/new"/> {/* Link to create a new user */}
            </CardHeader>

            <DataTable columns={columns} data={user}/> {/* DataTable component */}
         </Main>
      </>
   )
}

export default Users;

export const getServerSideProps: GetServerSideProps<UserProps> = async (ctx) => {
   const { ["directDistributorAuth.token"]: token } = parseCookies(ctx); // Get the token saved in the authentication cookie

   if (!token) { // If the token does not exist, redirect the client to the login page
      return {
         redirect: {
            destination: "/login",
            permanent: false,
         }
      }
   }

   try {
      const api = getApiDirectDistributor(ctx);
      const response = await api.get<User[]>("/user"); // API route to get all administrator users
      const user = response.data;

      return {
         props: {
            user,
         },
      }
   } catch (error) {
      return { 
         props: {
            user: []
         }
      }
   }
}

