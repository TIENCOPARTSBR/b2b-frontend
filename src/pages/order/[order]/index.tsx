import React, { useState } from "react"
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { getApiDealer } from "@/src/api/dealer/axios";
import Main from "@/src/components/Dealer/Main"
import Breadcrumb from "@/src/components/Breadcrumb"
import Title from "@/src/components/Title"
import Row from "@/src/components/Dealer/Row"
import Listing from "@/src/components/Listings/sales-order/order/listing";
import Cover from "@/src/pages/order/[order]/cover";
import Submit from "@/src/pages/order/[order]/submit";
import InsertProduct from "@/src/pages/order/[order]/insert-product";
import Purchase from "@/src/pages/order/[order]/purchase";

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
    total_cost: number
    total_weight: number
    total_items: number
}

interface OrderProps {
    order: ItemOrder|any
    items?: any
    resume?: any
    error?: any
}

const Index = ({ order, items, error, resume } : OrderProps) => {
    const api = getApiDealer("")
    const {['dealerAuth.id_dealer']: id_dealer} = parseCookies();
    const [ updateListing,  setUpdateListing ] = useState<{}>(items)
    const [ orderResume,  setOrderResume ] = useState<{}>(resume)

    const handleUpdateListing = async () => {
        const response = await api.post("/order/item/all", {
            id_sales_order: order?.id,
            id_dealer: id_dealer,
        })
        setUpdateListing(response?.data?.data);
        await handleUpdateOrderResume();
    }

    const handleUpdateOrderResume = async () => {
        const response= await api.post("/salesOrder/resume", {
            id: order?.id,
        })
        setOrderResume(response?.data?.data);
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
            name: "View P.O.",
            link: "/sales-order/choice",
        },
    ]

    let status = '';
    switch (order?.status) {
        case "1":
            status = 'Ready to dispatch'
            break;
        case "2":
            status = 'Requested'
            break;
        case "3":
            status = 'Waiting for confirmation'
            break;
        case "4":
            status = 'Completed'
            break;
        default:
            status = 'Draft'
    }

    return (
        <Main>
            { !error ? (
                <>
                    <Row>
                        <Breadcrumb list={ breadcrumb }/>
                        <Title title={`Purchase Order ${order?.id}`} />
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

                    { order?.status <= 1  && <Submit /> }

                    { order?.status == 3  && <Purchase order={order} orderResume={orderResume} /> }
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
        let resume = "";
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

        await api.post("/salesOrder/resume", {
            id: ctx?.params?.order,
        })
        .then((response) => {
            resume = response.data.data;
        })

        return {
            props: {
                order: order,
                items: items,
                resume: resume,
                error: errorString ?? null
            }
        }
    } catch (e) {
        return {
            props: {
                order: [],
                items: [],
                resume: null,
                error: null
            }
        }
    }
}