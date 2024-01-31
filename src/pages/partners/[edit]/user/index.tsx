"use client";

import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import LinkSmall from "@/src/components/LinkSmall";

import Listing from "@/src/components/Listings/partners/user/listing";

import { 
    newUser,
    title 
} from "@/src/utils/constants/Dealer/User/util";
import { getApiDealer } from "@/src/api/dealer/axios";
import { useRouter } from "next/router";

type User = {
    id: number
    name: string
    email: string
}

type Partner = {
    id: number
    name: string
}

interface UserProps {
    user: User[]
    partner: Partner|null
}
const User = ({ user, partner } : UserProps) => {
    const router = useRouter()

    const breadcrumb = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Partners",
            link: "/partners",
        },
        {
            name: `${partner?.name}`,
            link: `/partners/${partner?.id}`,
        },
        {
            name: "Users",
            link: `/partners/${partner?.id}/user`,
        }
    ]

    return (
        <Main>
            <div className="flex items-start">
                <div className="w-100% md:w-50% flex flex-col">
                    <Breadcrumb list={ breadcrumb } />
                    <Title title={`${partner?.name} | ${title}`} />
                </div>

                <div className="w-100% md:w-50% mt-5 md:mt-0 flex items-start justify-end">
                    <LinkSmall
                        href={`${router.asPath}/new`}
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

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }

    try {
        const api = getApiDealer('');
        const userResponse = await api.get(`/partner/users/${ctx?.params?.edit}`);
        console.error('userResponse')
        const userData = userResponse?.data?.data


        const partnerResponse = await api.get(`/partner/${ctx?.params?.edit}`);
        const partnerData = partnerResponse?.data?.data;

        return {
            props: {
                user: userData,
                partner: partnerData,
            },
        };
    } catch (error) {
        return {
            props: {
                user: [],
                partner: null,
            },
        };
    }
}

