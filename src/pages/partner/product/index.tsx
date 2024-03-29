"use client";

import Image from "next/image";
import { useState } from "react";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import CardProduct from "@/src/components/CardProduct";
import Main from "@/src/components/Partner/Main";
import {getApiPartner} from "@/src/api/partner/axios";
const Product = () => {
    const [ input, setInput] = useState<string>("")
    const [ data, setData] = useState<[]>([])
    const [ notFound, setNotFound] = useState<boolean>(false)
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const api = getApiPartner("")
        api.post("/product", { part_number: input })
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
            <div className="w-50% flex flex-col mb-25px">
                <Breadcrumb list={breadcrumb}/>
                <Title title={"Search product"} />
            </div>

            <form className="w-100% box-border relative z-0" onSubmit={handleSubmit}>
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
                    className="w-100% h-auto border-1 rounded-8px p-15px focus:outline-yellow_one pl-50px text-black font-normal font-inter text-13px"
                    onChange={(e: any) => {setInput(e.target.value)}}
                />
            </form>

            <div className="box-border flex my-35px">
                { data && (
                    <CardProduct data={data} />
                )}

                { notFound && (
                    <h2 className="w-100% flex items-center text-13px font-medium font-inter text-yellow_two">
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
    const {["partnerAuth.token"]: token} = parseCookies(ctx); // Get the token saved in the authentication cookie

    if (!token) { // If the token does not exist, redirect the client to the login page
        return {
            redirect: {
                destination: "/partner/login",
                permanent: false,
            }
        }
    }

    return {
        props: {
        }
    }
}