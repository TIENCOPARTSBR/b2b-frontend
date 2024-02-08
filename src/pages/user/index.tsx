"use client";

import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { getApiDealer } from "@/src/api/dealer/axios";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import LinkSmall from "@/src/components/LinkSmall";
import Listing from "@/src/components/Listings/user/listing";

import { 
    breadcrumb,
    newUser,
    title 
} from "@/src/utils/constants/Dealer/User/util";

type User = {
    id: number
    name: string
    email: string
    is_active: number
    created_at: string
}

interface UserProps {
    user: User[]
}

const User = ({ user } : UserProps) => {
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

                <div className="w-100% md:w-50% mt-5 md:mt-0 flex items-start justify-end">
                    <LinkSmall
                        href={ newUser.link }
                        name={ newUser.text }
                        bgColor={ newUser.color }
                    />
                </div>
            </div>

            <Listing list={user} />
        </Main>
    )
}

export default User;

export const getServerSideProps: GetServerSideProps<UserProps> = async (ctx) => {
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
        const response = await api.post("/user/all", {
            id_dealer: id_dealer
        });

        let userData: any = [];

        response?.data?.data.map(function(row: any) {
            userData.push({
                id: row?.id,
                name: row?.name,
                email: row?.email,
                is_active: row?.is_active === 1 ? 'Active' : 'Inactive',
                created_at: row?.created_at,
            })
        })

        return {
            props: {
                user: userData,
            },
        };
    } catch (error) {
        return {
            props: {
                user: [],
            },
        };
    }
}

