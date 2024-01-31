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
    quotation: QuotationItem
    quotationItem: QuotationItens
}

const Index = ({ quotation, quotationItem } : NewQuotationProps) => {
    const [ updateListing,  setUpdateListing ] = useState<{}>(quotationItem)

    const handleUpdateListing =  async () => {
        const api = getApiDealer("")

        const response = await api.post(`/quotation/item/all`, {
            id_quotation: quotation?.id
        })

        setUpdateListing(response?.data?.data)
    }

    return (
        <Main>
            <Row>
                <Breadcrumb list={breadcrumb()}/>
                <Title title={TitleConst}/>
            </Row>

            <Cover quotation={quotation}/>

            <InsertProduct
                onUpdateListing={handleUpdateListing}
            />

            <Listing
                onUpdateListing={handleUpdateListing}
                itens={updateListing}
            />

            <Submit />
        </Main>
    )
}

export default Index

export const getServerSideProps: GetServerSideProps<NewQuotationProps> = async (ctx) => {
    const {['dealerAuth.token']: token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }
    
    try {
        const api = getApiDealer(ctx)
        const quotation = await api.post(`/quotation`, {
            id: ctx?.params?.edit
        })

        const quotationItem = await api.post(`/quotation/item/all`, {
            id_quotation: ctx?.params?.edit
        })

        return {
            props: {
                quotation: quotation?.data?.data || [],
                quotationItem: quotationItem?.data?.data || []
            }
        }
    } catch (e) {
        return {
            props: {
                quotation: [],
                quotationItem: []
            }
        }
    }
}