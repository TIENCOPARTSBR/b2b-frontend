import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import DataTable from "@/src/components/Datatable";

type DealerType = {
    id: number
    name: string
    is_active: number
    created_at: string
    type_of_access: number
    allow_to_quotation: number
    allow_to_partner: number
    sisrev_br_code: string
    sisrev_usa_code: string
}
interface ListDealers {
    list: DealerType[]
}

const Listing = ({ list }: ListDealers) => {
    const router = useRouter()

    const editDealerEndpoint = `/admin/dealer/`

    const handleDealerUpdate = (id: number) => {
        router.push(editDealerEndpoint+id)
    }

    const handleEditUserDealer = (id: number) => {
        router.push('/admin/dealer/'+id+'/user')
    }

    const columns = [
        {
            Header: "NAME",
            accessor: "name",
            width: "20%",
        },
        {
            Header: "TYPE OF ACCESS",
            accessor: "type_of_access",
            width: "10%",
        },
        {
            Header: "ALLOW QUOTATION",
            accessor: "allow_to_quotation",
            width: "10%",
        },
        {
            Header: "ALLOW PARTNER",
            accessor: "allow_to_partner",
            width: "10%",
        },
        {
            Header: "SISREV BR",
            accessor: "sisrev_br_code",
            width: "10%",
        },
        {
            Header: "SISREV USA",
            accessor: "sisrev_usa_code",
            width: "10%",
        },
        {
            Header: "STATUS",
            accessor: "is_active",
            width: "10%",
        },
        {
            Header: "CREATED",
            accessor: "created_at",
            width: "10%",
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