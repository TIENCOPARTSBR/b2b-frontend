"use client";

import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import Main from "@/src/components/Admin/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import LinkSmall from "@/src/components/LinkSmall";

import Listing from "@/src/components/Listings/admin/user/listing";

import { 
    breadcrumb,
    newUser,
    title 
} from "@/src/utils/constants/Admin/User/util";

import { getApiAdmin } from "@/src/api/adm/axios";

type User = {
    id: number
    name: string
    email: string
    is_active: string
    created_at: string
    type: string
}
interface UserProps {
    user: User[]
}
const User = ({ user } : UserProps) => {
    return (
        <Main>
            <div className="flex items-start">
                <div className="w-100% md:w-50% flex flex-col">
                    <Breadcrumb list={ breadcrumb } />
                    <Title title={ title } />
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
    const { ["adminAuth.token"] : token} = parseCookies(ctx);

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
        const response = await api.get(`user`);
        const userData = response?.data?.data || [];

        userData.forEach((user: any) => {
            user['is_active'] = user['is_active'] === 1 ? 'Active' : 'Inactive';
            user['type'] = user['type'] === 1 ? 'Admin' : 'User';
        });

        return {
            props: {
                user: userData,
            },
        };
    } catch (e) {
        return {
            props: {
                user: [],
            },
        };
    }
}

