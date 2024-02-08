'use client';

import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { getApiDealer } from "@/src/api/dealer/axios";

import { breadcrumb, newPartner, title } from "@/src/utils/constants/Dealer/Partner/util";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import LinkSmall from "@/src/components/LinkSmall";

import Listing from "@/src/components/Listings/partners/listing";

type PartnerType = {
    id: number
    name: string
    is_active: string
    created_at: string
}

interface PartnerProps {
    partner: PartnerType[]
}

const Partner = ({ partner } : PartnerProps) => {
    return (
        <Main>
            <div className="flex items-start">
                <div className="w-100% md:w-50% flex flex-col">
                    <Breadcrumb
                        list={ breadcrumb }
                    />

                    <Title
                        title={ title }
                    />
                </div>

                <div className="w-100% md:w-50% mt-5 md:mt-0 flex items-center justify-end">
                    <LinkSmall
                        href={newPartner.link}
                        name={newPartner.text}
                        bgColor={newPartner.color}
                    />
                </div>
            </div>

            <Listing list={partner} />

        </Main>
    )
}
export default Partner;


export const getServerSideProps: GetServerSideProps<PartnerProps> = async (ctx) => {
    const { ['dealerAuth.token'] : token} = parseCookies(ctx);
    const { ['dealerAuth.id_dealer'] : id_dealer} = parseCookies(ctx);

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
        const response= await api.post('/partner/all', {
            id_dealer: id_dealer
        });
        const data: any = [];

        response?.data?.data.map((index: any) => {
            data.push({
                id: index?.id,
                name: index?.name,
                created_at: index?.created_at,
                is_active: (index?.is_active == 0 ? 'Inactive' : 'Active'),
            });
        });

        return {
            props: {
                partner: data
            }
        }
    } catch (error) {
        return {
            props: {
                partner: []
            }
        };
    }
}

