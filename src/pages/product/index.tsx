'use client';

import Image from "next/image";
import { useState } from "react";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

import { getApiDealer } from "@/src/api/dealer/axios";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import CardProduct from "@/src/components/CardProduct";

const Product = () => {
    const [input, setInput] = useState<string>('')
    const [data, setData] = useState<[]>([])
    const [notFound, setNotFound] = useState<boolean>(false)

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const api = getApiDealer('')
        api.post('/product', { part_number: input })
            .then((response) => {
                setNotFound(false)
                setData(response?.data?.data)
            })
            .catch((e) => {
                setData([])
                setNotFound(true)
            })
    }

    const breadcrumb = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Product",
            link: "/product",
        },
        {
            name: "Search",
            link: "/product",
        },
    ]

    return (
        <Main>
                <div className="w-100% mb-25px flex flex-col">
                    <Breadcrumb list={breadcrumb}/>
                    <Title title={'Search product'} />
                </div>

            <form className="box-border relative z-0" onSubmit={handleSubmit}>
                <button type="submit" className="w-50px h-100% absolute top-0 left-0 flex items-center justify-center">
                    <Image
                        src="/icon/icon-search.svg"
                        alt="Icon search"
                        width="18"
                        height="18" />
                </button>

                <input
                    type="text"
                    placeholder="Type the Part Number..."
                    className="w-100% h-auto border-1 rounded-8px p-15px focus:outline-yellow_one pl-50px text-black font-normal font-inter text-14px"
                    onChange={(e: any) => {setInput(e.target.value)}}
                />
            </form>

            <div className="box-border flex my-35px w-100%">
                { data && (
                    <CardProduct data={data}/>
                )}

                { notFound && (
                    <h2 className="w-100% flex items-center text-14px font-medium font-inter text-yellow_two">
                        <Image src="/icon/icon-warning-yellow.svg"
                               alt="Icon Warning"
                               width="16"
                               height="16"
                               className="mr-2"
                        />
                        Part Number not found in our database. Check your spelling and try again
                    </h2>
                )}
            </div>
        </Main>
    )
}

export default Product;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {['dealerAuth.token']: token} = parseCookies(ctx); // Get the token saved in the authentication cookie

    if (!token) { // If the token does not exist, redirect the client to the login page
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }

    return {
        props: {
        }
    }
}