import Image from "next/image";

import DataTable from "@/src/components/Datatable";
import {useState} from "react";
import ModalDeleteDatatable from "@/src/components/Dealer/ModalDeleteDatatable";
import ModalEditItemQuotationDatatable from "@/src/components/Dealer/ModalEditItemQuotationDatatable";

interface QuotationItemProps {
    itens: {}
    onUpdateListing: () => void
    status?: string
}

const Listing = ({ onUpdateListing, itens, status } : QuotationItemProps) => {
    const [displayItemQuotationDeleteModal, setDisplayItemQuotationDeleteModal] = useState<boolean>(false)
    const [displayItemQuotationEditModal, setDisplayItemQuotationEditModal] = useState<boolean>(false)
    const [itemId, setItemId] = useState<number>(0)

    const handleToEditQuotation = (id: number) => {
        setItemId(id)
        setDisplayItemQuotationEditModal((prev) => !prev)
    }

    const handleItemQuotationDelete = (id: number) => {
        setItemId(id)
        setDisplayItemQuotationDeleteModal((prev) => !prev)
    }

    let columns = [
        {
            Header: "Actions",
            accessor: "action",
            width: "5%",
            Cell: ({ row }: any) => (
                <div className="flex items-center w-auto text-right">
                    <button onClick={() => handleToEditQuotation(row.original.id)}
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
            Header: "Part number",
            accessor: "part_number",
            width: "5%",
        },
        {
            Header: "Quantity",
            accessor: "quantity",
            width: "4%",
        },
        {
            Header: "MOQ",
            accessor: "moq",
            width: "3%",
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
            width: "5%",
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
            Cell: ({ row }: any) => (
                <>
                    {row.original.location == "BR" && (
                        <div className="flex items-center w-auto text-right">
                            <Image src="/icon/icon-br-flag.svg" width="23" height="15" alt="icon br flag" className="ml-3"/>
                        </div>
                    )}

                    {row.original.location == "USA" && (
                        <div className="flex items-center w-auto text-right">
                            <Image src="/icon/icon-usa-flag.svg" width="23" height={'15'} alt="icon usa flag" className="ml-3"/>
                        </div>
                    )}
                </>
            ),
        },
        {
            Header: "In stock",
            accessor: "stock",
            width: "3%",
        },
        {
            Header: "Availability",
            accessor: "lead_time",
            width: "5%",
        },
    ]

    if (status != '0') {
        columns = columns.filter((item, index) => index !== 0);
    }

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


            {displayItemQuotationEditModal && (
                <ModalEditItemQuotationDatatable
                    editTargetId={itemId}
                    handleOnVisible={() => setDisplayItemQuotationEditModal(false)}
                    handleApiUpdate={`/quotation/item/update`}
                    handleUpdateListing={onUpdateListing}
                />
            )}

            <DataTable
                columns={columns}
                data={itens}
                page_size={50}
            />
        </>
    )
}

export default Listing;