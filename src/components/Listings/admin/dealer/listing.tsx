import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import DataTable from "@/src/components/Datatable";
import ModalDelete from "@/src/components/Admin/ModalDelete";

type PartnerType = {
    id: number
    name: string
    is_active: string
    created_at: string
}

interface ListPartners {
    list: PartnerType[]
}

const Listing = ({ list }: ListPartners) => {
    const router = useRouter()

    const [displayDealerDeleteModal, setDisplayDealerDeleteModal] = useState(false)
    const [dealerId, setDealerId] = useState<number>(0)

    const editDealerEndpoint = `/admin/dealer/`

    const handleDealerUpdate = (id: number) => {
        router.push(editDealerEndpoint+id)
    }

    const handleEditUserDealer = (id: number) => {
        router.push('/admin/dealer/'+id+'/user')
    }

    const columns = [
        {
            Header: "ID",
            accessor: "id",
            width: "20%",
        },
        {
            Header: "NAME",
            accessor: "name",
            width: "30%",
        },
        {
            Header: "STATUS",
            accessor: "is_active",
            width: "40%",
        },
        {
            Header: "CREATED",
            accessor: "created_at",
            width: "40%",
        },
        {
            Header: "ACTIONS",
            accessor: "action",
            width: "10%",
            Cell: ({ row }: any) => (
                <div className="flex items-center w-auto text-right">
                    <button onClick={() => handleDealerUpdate(row.original.id)}
                            className="w-25px h-25px ml-1 flex items-center justify-centers">
                        <Image src="/icon/icon-edit.svg" width="18" height="18" alt="icon edit"/>
                    </button>

                    <button onClick={() => handleEditUserDealer(row.original.id)}
                            className="w-25px h-25px ml-1 flex items-center justify-centers">
                        <Image src="/icon/icon-user.svg" width="18" height="18" alt="icon user"/>
                    </button>
                </div>
            )
        }
    ]

    return (
        <>
            <DataTable
                columns={columns}
                data={list}
                page_size={10}
            />
        </>
    )
}

export default Listing;