import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import DataTable from "@/src/components/Datatable";
import ModalDelete from "@/src/components/Dealer/ModalDelete";

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

    const [displayPartnerDeleteModal, setDisplayPartnerDeleteModal] = useState(false)
    const [partnerId, setPartnerId] = useState<number>(0)

    const editPartnerEndpoint = `/partners/`

    const handlePartnerUpdate = (id: number) => {
        router.push(editPartnerEndpoint+id)
    }

    const handlePartnerUpdateValues = (id: number) => {
        router.push('/partners/'+id+'/update-values')
    }

    const handleUserDelete = (id: number) => {
        setPartnerId(id)
        setDisplayPartnerDeleteModal((prev) => !prev)
    }

    const handlePartnerUser = (id: number) => {
        router.push('/partners/'+id+'/user')
    }

    const columns = [
        {
            Header: "NAME",
            accessor: "name",
            width: "70%",
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
                    <button onClick={() => handlePartnerUpdate(row.original.id)}
                            className="w-25px h-25px ml-1 flex items-center justify-centers">
                        <Image src="/icon/icon-edit.svg" width="18" height="18" alt="icon edit"/>
                    </button>

                    <button onClick={() => handlePartnerUpdateValues(row.original.id)}
                            className="w-25px h-25px ml-1 flex items-center justify-centers">
                        <Image src="/icon/icon-money.svg" width="18" height="18" alt="icon money"/>
                    </button>

                    <button onClick={() => handlePartnerUser(row.original.id)}
                            className="w-25px h-25px ml-1 flex items-center justify-centers">
                        <Image src="/icon/icon-user.svg" width="18" height="18" alt="icon user"/>
                    </button>

                    <button onClick={() => handleUserDelete(row.original.id)}
                            className="w-25px h-25px ml-1 flex items-center justify-centers">
                        <Image src="/icon/icon-trash.svg" width="18" height="18" alt="icon crash"/>
                    </button>
                </div>
            )
        }
    ]

    return (
        <>
            {displayPartnerDeleteModal && (
                <ModalDelete
                    deleteTargetId={partnerId}
                    handleOnVisible={() => setDisplayPartnerDeleteModal(false)}
                    handleApiDelete={`/partner/delete`}
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