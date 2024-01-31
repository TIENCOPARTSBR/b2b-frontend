"use client";

import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import LinkSmall from "@/src/components/LinkSmall";
import Main from "../../../components/Partner/Main";

import Listing from "@/src/components/Listings/partner/user/listing";

import { 
    breadcrumb,
    newUser,
    title 
} from "@/src/utils/constants/Partner/User/util";
import { getApiPartner } from "@/src/api/partner/axios";

type User = {
    id: number
    name: string
    email: string
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
    const { ["partnerAuth.token"] : token} = parseCookies(ctx);
    const { ["partnerAuth.id_partner"] : id_partner} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/partner/login",
                permanent: false,
            }
        }
    }

    try {
        const api = getApiPartner(ctx);
        const response = await api.get(`/users/${id_partner}`);
        const userData = response?.data?.data || [];

        return {
            props: {
                user: userData,
            }
        }
    } catch (error) {
        return {
            props: {
                user: [],
            }
        }
    }
}

