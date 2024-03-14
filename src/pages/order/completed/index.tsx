import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { getApiDealer } from "@/src/api/dealer/axios";
import { breadcrumb, TitlePage } from "@/src/utils/constants/Dealer/Quotation/util";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Row from "@/src/components/Dealer/Row";
import ListingCompleted from "@/src/components/Listings/sales-order/completed/listing";

type OrderItem = {
    id: number,
    client_name: string,
    client_order: string,
    requested_by: string,
    urgent: number,
    deadline: string,
    type: string,
    status: string,
    created_at: string,
    updated_at: string,
    viewed: boolean
}

interface OrderProps {
    order: OrderItem[]
}

const OrdersCompleted = ({ order } : OrderProps) => {

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
            link: "/order",
        },
        {
            name: "Processing P.O.'s",
            link: "/order/completed",
        },
    ]

    return (
        <Main>
            <Row>
                <Breadcrumb list={ breadcrumb } />
                <Title title="Processing P.O.'s" />
            </Row>

            <ListingCompleted order={order} />
        </Main>
    )
}

export default OrdersCompleted;

export const getServerSideProps: GetServerSideProps<OrderProps> = async (ctx) => {
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
        const response= await api.post('/salesOrder/all-completed', {
            id_dealer: id_dealer
        });

        return {
            props: {
                order: response?.data?.data || []
            }
        }
    } catch (error) {
        return {
            props: {
                order: []
            }
        };
    }
}