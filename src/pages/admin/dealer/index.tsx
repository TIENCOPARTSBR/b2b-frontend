'use client';

import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { breadcrumb, newDealer, title } from "@/src/utils/constants/Admin/Dealer/util";

import Main from "@/src/components/Admin/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import LinkSmall from "@/src/components/LinkSmall";

import Listing from "@/src/components/Listings/admin/dealer/listing";
import { getApiAdmin } from "@/src/api/adm/axios";

type DealerType = {
    id: number
    name: string
    is_active: string
    created_at: string
}

interface DealerProps {
    dealer: DealerType[]
}

const Dealer = ({ dealer } : DealerProps) => {
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
                        href={newDealer.link}
                        name={newDealer.text}
                        bgColor={newDealer.color}
                    />
                </div>
            </div>

            <Listing list={dealer} />

        </Main>
    )
}
export default Dealer;


export const getServerSideProps: GetServerSideProps<DealerProps> = async (ctx) => {
    const { ['adminAuth.token'] : token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            }
        }
    }

    try {
        const api = getApiAdmin(ctx);
        const response= await api.get('/dealer');
        const data: any = [];

        response?.data?.data.map((index: any) => {
            data.push({
                'id': index?.id,
                'name': index?.name,
                'created_at': index?.created_at,
                'is_active': (index?.is_active == false ? 'Inativo' : 'Ativo'),
            });
        });

        return {
            props: {
                dealer: data
            }
        }
    } catch (error) {
        return {
            props: {
                dealer: []
            }
        };
    }
}

