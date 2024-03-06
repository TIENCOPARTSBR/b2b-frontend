import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { getApiDealer } from "@/src/api/dealer/axios";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Row from "@/src/components/Dealer/Row";
import Listing from "@/src/components/Listings/sales-order/listing";

type SalesOrderItem = {
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

interface SalesOrderProps {
    salesOrder: SalesOrderItem[]
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

const Quotation = ({ salesOrder } : SalesOrderProps) => {
    return (
        <Main>
            <Row>
                <Breadcrumb list={ breadcrumb } />
                <Title title="Sales order" />
            </Row>

            <Listing salesOrder={salesOrder} />
        </Main>
    )
}

export default Quotation;

export const getServerSideProps: GetServerSideProps<SalesOrderProps> = async (ctx) => {
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
        const response= await api.post('/salesOrder/all', {
            id_dealer: id_dealer
        });

        return {
            props: {
                salesOrder: response?.data?.data
            }
        }
    } catch (error) {
        return {
            props: {
                salesOrder: []
            }
        };
    }
}