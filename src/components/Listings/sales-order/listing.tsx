import Image from "next/image";
import { useRouter } from "next/router";
import DataTable from "@/src/components/Datatable";
import { getApiDealer } from "@/src/api/dealer/axios";

interface SalesOrderProps {
    salesOrder: {}
}

const Listing = ({ salesOrder } : SalesOrderProps) => {
    const router = useRouter()

    const viewedQuotation = async (id: number) => {
        const api = getApiDealer('')
        await api.put('/salesOrder/update', {
            id: id,
            viewed: true
        }).then(r => {});
    }

    const handleToViewSalesOrder = (id: number) => {
        router.push(`/order/${id}`);
        viewedQuotation(id).then(r => {})
    }

    const columns = [
        {
            Header: "ID",
            accessor: "id",
            width: "5%"
        },
        {
            Header: "TYPE",
            accessor: "type",
            width: "5%",
        },
        {
            Header: "CLIENT",
            accessor: "client_name",
            width: "15%",
            Cell: ({ row }: any) => (
                <>
                    {row.original.urgent == 1 ? (
                        <div className="flex items-center w-auto text-right">
                            {row.original.client_name}
                            <Image src="/icon/icon-info-circle.svg" width="14" height="14" alt="icon urgent" className="ml-3"/>
                            {row.original.viewed != 1 ? <span className="px-1.5 py-1 ml-3 text-10px text-white font-inter font-semibold rounded-4px bg-yellow_two ">NEW</span> : '' }
                        </div>
                    ) : (
                        row.original.client_name
                    )}
                </>
            ),
        },
        {
            Header: "PAYMENT METHOD",
            accessor: "payment_method",
            width: "8%",
        },
        {
            Header: "CLIENT ORDER",
            accessor: "client_order_number",
            width: "8%",
        },
        {
            Header: "SUBMITTED AT",
            accessor: "created_at",
            width: "8%",
        },
        {
            Header: "DEADLINE",
            accessor: "deadline",
            width: "8%",
        },
        {
            Header: "STATUS",
            accessor: "status",
            width: "5%",
        },
        {
            Header: "ACTIONS",
            accessor: "action",
            width: "5%",
            Cell: ({ row }: any) => (
                <>
                    <div className="flex items-center w-auto text-right">
                        <button onClick={() => handleToViewSalesOrder(row.original.id)}
                                className="w-25px h-25px flex items-center justify-centers">
                            <Image src="/icon/icon-view.svg" width="18" height="18" alt="icon edit"/>
                        </button>
                    </div>
                </>
            ),
        }
    ]

    return (
        <DataTable
            columns={columns}
            data={salesOrder}
            page_size={30}
        />
    )
}

export default Listing;