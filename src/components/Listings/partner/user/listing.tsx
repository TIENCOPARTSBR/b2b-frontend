import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import DataTable from "@/src/components/Datatable";
import ModalDeletePartner from "@/src/components/ModalDeletePartner";

type User = {
    id: number
    name: string
    email: string
}
interface ListUserProps {
    list: User[]
}
const Listing = ({ list }: ListUserProps) => {
    const router = useRouter()

    const [displayUserDeleteModal, setDisplayUserDeleteModal] = useState<boolean>(false)
    const [userId, setUserId] = useState<number>(0)

    const editUserEndpoint = "/partner/user/"
    const handleUserUpdate = (id: number) => {
        router.push(editUserEndpoint+id)
    }
    const handleUserDelete = async (id: number) => {
        setUserId(id)
        setDisplayUserDeleteModal((prev) => !prev)
    }

    const columns = [
        {
            Header: "NAME",
            accessor: "name",
            width: "30%",
        },
        {
            Header: "EMAIL",
            accessor: "email",
            width: "40%",
        },
        {
            Header: "ACTIONS",
            accessor: "action",
            width: "10%",
            Cell: ({ row }: any) => (
                <div className="flex items-center justify-end w-auto text-right">
                    <button 
                        onClick={() => handleUserUpdate(row.original.id)}
                        className="w-25px h-25px flex items-center justify-centers text-right">
                        <Image
                            src="/icon/icon-edit.svg"
                            width="18"
                            height="18"
                            alt="icon edit"
                        />
                    </button>

                    <button 
                        onClick={() => handleUserDelete(row.original.id)} 
                        className="w-25px h-25px flex items-center justify-centers text-right">
                        <Image
                            src="/icon/icon-trash.svg"
                            width="18"
                            height="18"
                            alt="icon edit"
                        />
                    </button>
                </div>
            ),
        }
    ]

    return (
        <>
            { displayUserDeleteModal && (
                <ModalDeletePartner
                    deleteTargetId={userId}
                    handleOnVisible={() => setDisplayUserDeleteModal(false)}
                    handleApiDelete={`/user/delete`}
                />
            )}

            <DataTable
                columns={columns}
                data={list}
                page_size={10}
            />
        </>
    )
}

export default Listing;