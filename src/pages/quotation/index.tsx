import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { getApiDealer } from "@/src/api/dealer/axios";
import { breadcrumb, TitlePage } from "@/src/utils/constants/Dealer/Quotation/util";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Row from "@/src/components/Dealer/Row";
import Listing from "@/src/components/Listings/quotation/listing";

type QuotationItem = {
    id: number,
    client_name: string,
    client_order: string,
    requested_by: string,
    urgent: number,
    deadline: string,
    type: string,
    status: string,
    created_at: string,
    updated_at: string
}

interface QuotationProps {
    quotation: QuotationItem[]
}

const Quotation = ({ quotation } : QuotationProps) => {
    return (
        <Main>
            <Row>
                <Breadcrumb list={ breadcrumb } />
                <Title title={ TitlePage } />
            </Row>

            <Listing quotation={quotation} />
        </Main>
    )
}

export default Quotation;

export const getServerSideProps: GetServerSideProps<QuotationProps> = async (ctx) => {
    const { ["dealerAuth.token"] : token} = parseCookies(ctx);
    const { ["dealerAuth.id_dealer"] : id_dealer} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }

    try {
        const api = getApiDealer(ctx);
        const response= await api.post('/quotation/all', {
            id_dealer: id_dealer
        });

        return {
            props: {
                quotation: response?.data?.data || []
            }
        }
    } catch (error) {
        return {
            props: {
                quotation: []
            }
        };
    }
}