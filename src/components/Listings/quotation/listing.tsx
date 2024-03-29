import Image from "next/image";

import DataTable from "@/src/components/Datatable";
import LinkSmall from "@/src/components/LinkSmall";
import {useRouter} from "next/router";
import {getApiDealer} from "@/src/api/dealer/axios";
import {useMessageError} from "@/src/hooks/message/error";
import {useMessageSuccess} from "@/src/hooks/message/success";
import ErrorProcess from "@/src/utils/function/error";

interface QuotationProps {
    quotation: {}
}

const Listing = ({ quotation } : QuotationProps) => {
    const router = useRouter()

    const { setMessageError } = useMessageError()
    const { showMessage } = useMessageSuccess()

    const viewedQuotation = async (id: number) => {
        const api = getApiDealer('')
        await api.put('/quotation/update', {
            id: id,
            viewed: true
        }).then(r => {});
    }

    const handleToViewQuotation = (id: number) => {
        router.push(`/quotation/${id}`);

        viewedQuotation(id).then(r => {})
    }

    const handleRequestExcel = async (id: number) => {
        viewedQuotation(id).then(r => {})

        const api = getApiDealer('')
        await api.post('/quotation/generate-excel', {
            id_quotation: id
        })
            .then((response) => {
                const fileUrl = response?.data?.url;

                if (fileUrl) {
                    // Concatenar a URL base com a URL do arquivo
                    //const fullUrl = 'http://127.0.0.1:8000'+fileUrl;
                    const fullUrl = 'https://b2b-qas.azurewebsites.net'+fileUrl;
                    const link = document.createElement('a');
                    link.href = fullUrl;
                    link.download = 'quotation.xlsx';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    showMessage('Your Excel file download is ready.')
                } else {
                    setMessageError('Error while fetching file URL.');
                }
            })
            .catch((e) => {
                ErrorProcess(e)
            })
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
                <>
                    <div className="flex items-center w-auto text-right">
                        <button onClick={() => handleToViewQuotation(row.original.id)}
                                className="w-25px h-25px flex items-center justify-centers">
                            <Image src="/icon/icon-view.svg" width="18" height="18" alt="icon edit"/>
                        </button>
                    </div>
                    {row.original.status == "Completed" && (
                        <div className="flex items-center w-auto text-right">
                            <button onClick={() => handleRequestExcel(row.original.id)}
                                    className="w-25px h-25px flex items-center justify-centers">
                                <Image src="/icon/icon-download-excel.svg" width="18" height="18" alt="icon excel"/>
                            </button>
                        </div>
                    )}
                </>
            ),
        }
    ]

    return (
        <DataTable
            columns={columns}
            data={quotation}
            page_size={10}
            buttons={<LinkSmall bgColor="bg-yellow_one" href="/quotation/new" name="Submit quotation"/>}
        />
    )
}

export default Listing;