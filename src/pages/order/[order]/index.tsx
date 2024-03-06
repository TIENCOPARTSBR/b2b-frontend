import React, { useState } from "react"
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

import { getApiDealer } from "@/src/api/dealer/axios";

import Main from "@/src/components/Dealer/Main"
import Breadcrumb from "@/src/components/Breadcrumb"
import Title from "@/src/components/Title"
import Row from "@/src/components/Dealer/Row"
import Listing from "@/src/components/Listings/sales-order/order/listing";
import Cover from "@/src/pages/order/[order]/cover";
import Submit from "@/src/pages/order/[order]/submit";
import InsertProduct from "@/src/pages/order/[order]/insert-product";

type ItemOrder = {
    id: number
    client_name: string
    client_order: string
    requested_by: string
    urgent: number
    deadline: string
    type: string
    status: string
    id_dealer: number
}


interface OrderProps {
    order: ItemOrder|any
    items?: any
    error?: any
}

const Index = ({ order, items, error } : OrderProps) => {
    const {['dealerAuth.id_dealer']: id_dealer} = parseCookies();

    const [ updateListing,  setUpdateListing ] = useState<{}>(items)

    const handleUpdateListing =  async () => {
        const api = getApiDealer("")

        /*const response = await api.post("/quotation/item/all", {
            id_quotation: order?.id,
            id_dealer: id_dealer,
        })*/

        //setUpdateListing(response?.data?.data)
    }

    const breadcrumb: [{ name: string; link: string }, { name: string; link: string }, {
        name: string;
        link: string
    }] = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Orders",
            link: "/sales-order",
        },
        {
            name: "Place P.O.",
            link: "/sales-order/choice",
        },
    ]

    return (
        <Main>
            { !error ? (
                <>
                    <Row>
                        <Breadcrumb list={ breadcrumb }/>
                        <Title title={`Order ${order?.id}`} />
                    </Row>

                    <Cover order={ order } />

                    { order?.status == 0 && (
                        <InsertProduct
                            onUpdateListing={ handleUpdateListing }
                        />
                    )}

                    <Listing
                        status={ order?.status }
                        onUpdateListing={ handleUpdateListing }
                        itens={ updateListing }
                    />

                    { order?.status == 0  && <Submit /> }
                </>
            ) : (
                <Title title="This order is not allowed for this dealer."/>
            )}
        </Main>
    )
}

export default Index;

export const getServerSideProps: GetServerSideProps<OrderProps> = async (ctx) => {
    const {['dealerAuth.token']: token} = parseCookies(ctx);
    const {['dealerAuth.id_dealer']: id_dealer} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }
    
    try {
        let order = "";
        let items = "";
        let errorString = "";

        const api = getApiDealer(ctx)
            await api.post(`/salesOrder/unique`, {
                id: ctx?.params?.order,
                id_dealer: id_dealer
            })
            .then((response) => {
                order = response?.data?.data;
            })
            .catch((e) => {
                Object.keys(e?.response?.data?.errors).forEach((key) => {
                    e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                        errorString += `${errorMessage}<br>`
                    })
                })
            })

        await api.post("/order/item/all", {
            id_sales_order: ctx?.params?.order,
            id_dealer: id_dealer,
        })
            .then((response) => {
                items = response.data.data;
            })
        return {
            props: {
                order: order,
                items: items,
                error: errorString ?? null
            }
        }
    } catch (e) {
        return {
            props: {
                order: [],
                items: [],
                error: null
            }
        }
    }
}