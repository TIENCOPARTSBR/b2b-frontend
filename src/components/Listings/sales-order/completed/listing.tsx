import Image from "next/image";

import DataTable from "@/src/components/Datatable";
import LinkSmall from "@/src/components/LinkSmall";
import {useRouter} from "next/router";
import {getApiDealer} from "@/src/api/dealer/axios";
import {useMessageError} from "@/src/hooks/message/error";
import {useMessageSuccess} from "@/src/hooks/message/success";

interface OrderProps {
    order: {}
}

const ListingCompleted = ({ order } : OrderProps) => {
    const columns = [
        {
            Header: "PO",
            accessor: "order",
            width: "3%"
        },
        {
            Header: "PN",
            accessor: "partnumber",
            width: "3%",
        },
        {
            Header: "QTTY",
            accessor: "quantity",
            width: "3%",
        },
        {
            Header: "DESCRIPTION",
            accessor: "description",
            width: "5%",
        },
        {
            Header: "CLIENT",
            accessor: "client_name",
            width: "5%",
        },
        {
            Header: "CLIENT ORDER",
            accessor: "client_order_number",
            width: "5%",
        },
        {
            Header: "TOTAL PRICE",
            accessor: "total_price",
            width: "5%",
        },
        {
            Header: "SUBMITED AT",
            accessor: "created_at",
            width: "5%",
        },
        {
            Header: "DELIVERY EST.",
            accessor: "date_delivery",
            width: "5%",
        },
        {
            Header: "STATUS",
            accessor: "status",
            width: "5%",
        },

        {
            Header: "",
            accessor: "test",
            width: "0%",
        },
    ]

    return (
        <DataTable
            columns={columns}
            data={order}
            page_size={10}
        />
    )
}

export default ListingCompleted;