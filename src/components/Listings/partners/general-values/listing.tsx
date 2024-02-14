import Image from "next/image";
import { useState } from "react";

import DataTable from "@/src/components/Datatable";
import ModalNewAdditionalValue from "@/src/components/ModalNewAdditionalValue";
import ModalDelete from "@/src/components/ModalDelete";
import {getApiDealer} from "@/src/api/dealer/axios";
import ModalEditAdditionalValue from "@/src/components/ModalUpdateAdditionalValue";
import AlertError from "@/src/components/AlertError";
import {useAuthPartner} from "@/src/hooks/partner/auth";

interface ListingInterface {
    list: [];
    id_dealer: number;
}

interface buttonProps {
    id_dealer: number;
}

const Listing = ({ id_dealer, list }: ListingInterface) => {
    const { user } = useAuthPartner()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false)
    const [userId, setUserId] = useState<number>(0)
    const [data, setData] = useState<{}>({})
    const [alertError, setAlertError] = useState<string|null>(null)

    const handleEdit = (id: number) => {
        const api = getApiDealer('')
        api.post('/partner/additional-values/unique', {
            id_value: id,
            id_partner: 2
        })
        .then((response) => {
            setData({})
            setData(response?.data?.data)
        })
        .catch((e) => {
            console.log(e)
            let errorString = ""

            Object.keys(e?.response?.data?.errors).forEach((key) => {
                e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                    errorString += `${errorMessage}<br>`
                })
            })

            setAlertError(errorString)
        }).finally(() => {
            setTimeout(() => {
                setAlertError(null)
            }, 10000)

            setShowModalEdit((prev) => !prev)
        })
    }

    const handleDelete = (id: number) => {
        setUserId(id)
        setShowModal((prev) => !prev)
    }

    const columns = () => [
        {
            Header: "PART NUMBER",
            accessor: "partnumber",
            width: "25%",
        },
        {
            Header: "VALUE",
            accessor: "value",
            width: "25%",
        },
        {
            Header: "OPTION",
            accessor: "type",
            width: "25%",
        },
        {
            Header: "ACTIONS",
            accessor: "action",
            width: "10%",
            Cell: ({ row }: any) => (
                <div className="flex items-center w-auto text-right">
                    <button onClick={() => handleEdit(row.original.id)} className="w-25px h-25px flex items-center justify-centers">
                        <Image src="/icon/icon-edit.svg" width="18" height="18" alt="icon edit" />
                    </button>

                    <button onClick={() => handleDelete(row.original.id)} className="w-25px h-25px flex items-center justify-centers">
                        <Image src="/icon/icon-trash.svg" width="18" height="18" alt="icon edit" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            { alertError && (
                <AlertError text={alertError} />
            )}

            {showModal && (
                <ModalDelete
                    deleteTargetId={userId}
                    handleOnVisible={() => setShowModal(false)}
                    handleApiDelete={`/partner/additional-values/delete`}
                />
            )}

            {showModalEdit && (
                <ModalEditAdditionalValue
                    data={data}
                    onShow={() => setShowModalEdit(false)}
                    routeApi={'/partner/additional-values/update'}
                />
            )}

            <DataTable
                columns={columns()}
                data={list}
                page_size={10}
                buttons={<ButtonDatatable id_dealer={id_dealer} />}
            />
        </>
    )
}

export default Listing;

export const ButtonDatatable = ({id_dealer}: buttonProps) => {
    const [showModal, setShowModal] = useState(false)

    const handleAdd = () => {
        setShowModal((prev) => !prev)
    }

    return (
        <>
            {showModal && (
                <ModalNewAdditionalValue
                    id_partner={id_dealer}
                    onShow={() => setShowModal(false)}
                    routeApi={'/partner/additional-values/create'} />
            )}

            <div className={`w-100% flex items-center`}>
                <button className={`py-10px px-18px bg-yellow_one text-14px font-semibold text-black_two rounded-60px`}
                        onClick={handleAdd}>
                    Insert Product
                </button>
            </div>
        </>
    )
}