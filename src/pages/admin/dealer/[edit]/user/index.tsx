"use client";

import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";

import Main from "@/src/components/Admin/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import LinkSmall from "@/src/components/LinkSmall";

import Listing from "@/src/components/Listings/admin/dealer/user/listing";

import {newUser, title} from "@/src/utils/constants/Admin/User/util";

import {getApiAdmin} from "@/src/api/adm/axios";

type User = {
    id: number
    name: string
    email: string
    is_active: string
    created_at: string
    type: string
}

type Dealer = {
    id: number
    name: string
}

interface UserProps {
    user: User[]
    dealer: Dealer
}
const User = ({ user, dealer } : UserProps) => {
    const breadcrumb = [
        {
            name: "Home",
            link: "/admin",
        },
        {
            name: "Dealer",
            link: "/admin/dealer",
        },
        {
            name: `${dealer?.name}`,
            link: `/admin/dealer/${dealer?.id}`,
        },
        {
            name: "Users",
            link: `/admin/dealer/${dealer?.id}/user`,
        }
    ]

    return (
        <Main>
            <div className="flex items-start">
                <div className="w-100% md:w-50% flex flex-col">
                    <Breadcrumb list={ breadcrumb } />
                    <Title title={`${ dealer?.name } | ${ title }`} />
                </div>

                <div className="w-100% md:w-50% mt-5 md:mt-0 flex items-start justify-end">
                    <LinkSmall
                        href={`/admin/dealer/${dealer?.id}/user/new`}
                        name={ newUser.text }
                        bgColor={ newUser.color }
                    />
                </div>
            </div>

            <Listing list={ user } />
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
        const user: any = [];

        const api = getApiAdmin(ctx);

        await api.post(`/dealer/user/all`, { id_dealer: ctx?.params?.edit })
            .then((response) => {
                response?.data?.data?.map((index: any) => {
                    user.push({
                        'id': index?.id,
                        'name': index?.name,
                        'email': index?.email,
                        'created_at': index?.created_at,
                        'is_active': (index?.is_active == 1 ? 'Active' : 'Inactive'),
                        'type': (index?.type == 1 ? 'Admin' : 'User'),
                    })
                })
            })

        const dealer = await api.post('/dealer/',{ id: ctx?.params?.edit });

        return {
            props: {
                user: user,
                dealer: dealer?.data?.data
            }
        }
    } catch (e) {
        return {
            props: {
                user: [],
                dealer: []
            }
        }
    }
}

