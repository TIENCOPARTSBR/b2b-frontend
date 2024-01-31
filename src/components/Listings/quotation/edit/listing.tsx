import Image from "next/image";

import DataTable from "@/src/components/Datatable";
import { useRouter } from "next/router";
import {useState} from "react";
import ModalDelete from "@/src/components/ModalDelete";
import ModalDeleteDatatable from "@/src/components/Dealer/ModalDeleteDatatable";

interface QuotationItemProps {
    itens: {}
    onUpdateListing: () => void
}

const Listing = ({ onUpdateListing, itens } : QuotationItemProps) => {
    const router = useRouter()

    const [displayItemQuotationDeleteModal, setDisplayItemQuotationDeleteModal] = useState<boolean>(false)
    const [itemId, setItemId] = useState<number>(0)


    const handleToViewQuotation = (id: number) => {
        router.push(`/quotation/${id}`)
    }

    const handleItemQuotationDelete = (id: number) => {
        setItemId(id)
        setDisplayItemQuotationDeleteModal((prev) => !prev)
    }

    const columns = [
        {
            Header: "Actions",
            accessor: "action",
            width: "5%",
            Cell: ({ row }: any) => (
                <div className="flex items-center w-auto text-right">
                    <button onClick={() => handleToViewQuotation(row.original.id)}
                            className="w-25px h-25px flex items-center justify-centers">
                        <Image src="/icon/icon-edit.svg" width="18" height="18" alt="icon edit"/>
                    </button>

                    <button
                        onClick={() => handleItemQuotationDelete(row.original.id)}
                        className="w-25px h-25px flex items-center justify-centers text-right">
                        <Image
                            src="/icon/icon-trash.svg"
                            width="18"
                            height="18"
                            alt="icon trash"
                        />
                    </button>
                </div>
            ),
        },
        {
            Header: "ID",
            accessor: "id",
            width: "2%",
        },
        {
            Header: "Part number",
            accessor: "part_number",
            width: "5%",
        },
        {
            Header: "Quantity",
            accessor: "quantity",
            width: "5%",
        },
        {
            Header: "MOQ",
            accessor: "moq",
            width: "5%",
        },
        {
            Header: "Description",
            accessor: "description",
            width: "8%",
        },
        {
            Header: "Application",
            accessor: "application",
            width: "5%",
        },
        {
            Header: "Observation",
            accessor: "observation",
            width: "8%",
        },
        {
            Header: "Unit price",
            accessor: "unit_price",
            width: "8%",
        },
        {
            Header: "Total price",
            accessor: "total_price",
            width: "5%",
        },
        {
            Header: "Total weight",
            accessor: "total_weight",
            width: "5%",
        },
        {
            Header: "NCM",
            accessor: "ncm",
            width: "5%",
        },
        {
            Header: "HS Code",
            accessor: "hscode",
            width: "5%",
        },
        {
            Header: "Location",
            accessor: "location",
            width: "5%",
        },
        {
            Header: "In stock",
            accessor: "stock",
            width: "5%",
        },
        {
            Header: "Availability",
            accessor: "lead_time",
            width: "5%",
        },
    ]

    return (
        <>
            {displayItemQuotationDeleteModal && (
                <ModalDeleteDatatable
                    deleteTargetId={itemId}
                    handleOnVisible={() => setDisplayItemQuotationDeleteModal(false)}
                    handleApiDelete={`/quotation/item/delete`}
                    handleUpdateListing={onUpdateListing}
                />
            )}

            <DataTable
                columns={columns}
                data={itens}
                page_size={10}
            />
        </>
    )
}

export default Listing;