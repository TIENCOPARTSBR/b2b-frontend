import Image from "next/image";

import DataTable from "@/src/components/Datatable";
import LinkSmall from "@/src/components/LinkSmall";
import {useRouter} from "next/router";

interface QuotationProps {
    quotation: {}
}

const Listing = ({ quotation } : QuotationProps) => {
    const router = useRouter()

    const handleToViewQuotation = (id: number) => {
        router.push(`/quotation/${id}`)
    }

    const columns = [
        {
            Header: "ID",
            accessor: "id",
            width: "5%",
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
        },
        {
            Header: "REQUESTED BY",
            accessor: "requested_by",
            width: "8%",
        },
        {
            Header: "CLIENT ORDER",
            accessor: "client_order",
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
                <div className="flex items-center w-auto text-right">
                    <button onClick={() => handleToViewQuotation(row.original.id)} className="w-25px h-25px flex items-center justify-centers">
                        <Image src="/icon/icon-view.svg" width="18" height="18" alt="icon edit" />
                    </button>
                </div>
            ),
        }
    ]

    return (
        <DataTable
            columns={columns}
            data={quotation}
            page_size={10}
            buttons={<LinkSmall bgColor="bg-yellow_one" href="/quotation/new" name="Submit quotation" />}
        />
    )
}

export default Listing;