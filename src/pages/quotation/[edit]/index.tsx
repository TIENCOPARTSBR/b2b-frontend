import React, { useState } from "react"
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

import { breadcrumb, TitleConst } from "@/src/utils/constants/quotation/new/util"
import { getApiDealer } from "@/src/api/dealer/axios";

import Main from "@/src/components/Dealer/Main"
import Breadcrumb from "@/src/components/Breadcrumb"
import Title from "@/src/components/Title"
import Row from "@/src/components/Dealer/Row"
import InsertProduct from "@/src/pages/quotation/[edit]/insert-product";
import Listing from "@/src/components/Listings/quotation/edit/listing";
import Cover from "@/src/pages/quotation/[edit]/cover";
import Submit from "@/src/pages/quotation/[edit]/submit";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type QuotationItem = {
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

type QuotationItens = {
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

interface NewQuotationProps {
    quotation: QuotationItem|any
    quotationItem?: QuotationItens|any
    errorAPI?: any
}

const Index = ({ quotation, quotationItem, errorAPI } : NewQuotationProps) => {
    const {['dealerAuth.id_dealer']: id_dealer} = parseCookies();

    const [ updateListing,  setUpdateListing ] = useState<{}>(quotationItem)

    const handleUpdateListing =  async () => {
        const api = getApiDealer("")

        const response = await api.post("/quotation/item/all", {
            id_quotation: quotation?.id,
            id_dealer: id_dealer,
        })

        setUpdateListing(response?.data?.data)
    }

    return (
        <Main>
            { !errorAPI ? (
                <>
                    <Row>
                        <Breadcrumb list={breadcrumb()}/>
                        <Title title={TitleConst}/>
                    </Row>

                    <Cover quotation={quotation}/>

                    { quotation?.status <= 0 && <InsertProduct onUpdateListing={handleUpdateListing} /> }

                    <Listing status={quotation?.status} onUpdateListing={ handleUpdateListing } itens={ updateListing } />

                    { quotation?.status <= 0  && <Submit /> }
                </>
            ) : (
                <Title title="This quotation is not allowed for this dealer."/>
            )}
        </Main>
    )
}

export default Index

export const getServerSideProps: GetServerSideProps<NewQuotationProps> = async (ctx) => {
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
        let quotation = "";
        let quotationItem = "";
        let errorString = "";

        const api = getApiDealer(ctx)
            await api.post(`/quotation/unique/`, {
                id: ctx?.params?.edit,
                id_dealer: id_dealer
            })
                .then((response) => {
                    quotation = response?.data?.data;
                })
                .catch((e) => {
                    Object.keys(e?.response?.data?.errors).forEach((key) => {
                        e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                            errorString += `${errorMessage}<br>`
                        })
                    })
                })

        await api.post("/quotation/item/all", {
            id_quotation: ctx?.params?.edit,
            id_dealer: id_dealer,
        })
            .then((response) => {
                quotationItem = response.data.data;
            })
                .catch((error) => {
                console.error(error)
            })

        return {
            props: {
                quotation: quotation,
                quotationItem: quotationItem,
                errorAPI: errorString ?? null
            }
        }
    } catch (e) {
        return {
            props: {
                quotation: [],
                quotationItem: [],
                errorAPI: null
            }
        }
    }
}