'use client';

import { useState } from "react";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

import { getApiDealer } from "@/src/api/dealer/axios";

import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Main from "@/src/components/Dealer/Main";
import Listing from "@/src/components/Listings/partners/general-values/listing";
import GeneralUpdate from "@/src/pages/partners/[edit]/update-values/general-update";

type PartnerType = {
    id: number;
    name: string;
    id_dealer: number;
    general_update_type: string;
    general_update_value: string;
}

interface AdditionalValueInterface {
    partner: PartnerType;
    additionalValues: any;
}

const AdditionalValue = (props: AdditionalValueInterface) => {
    const [tab, setTab] = useState<number>(0)

    const handleClick = (e: number) => {
        setTab(e);
    }

    const breadcrumb = () => [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Partners",
            link: "/partner",
        },
        {
            name: "Update products",
            link: "/partners/"+props?.partner?.id+"/update-values",
        }
    ];


    return (
        <Main>
            <div className="flex mb-35px box-border">
                <div className="w-50% flex flex-col">
                    <Breadcrumb list={breadcrumb()}/>
                    <Title title={props?.partner?.name+' | Update products'} />
                </div>
            </div>

            <nav className="flex items-center border-b-1 z-0">
                <button className={`flex items-center justify-center p-5 z-10 text-13px font-inter font-normal ${tab === 0 ? 'text-yellow_one border-b-yellow_one border-b-2' : 'text-black_one'}`}
                        onClick={() => {handleClick(0)}}>
                    Single product
                </button>

                <button className={`flex items-center justify-center p-5 z-10 text-13px font-inter font-normal ${tab === 1 ? 'text-yellow_one border-b-yellow_one border-b-2' : 'text-black_one'}`}
                        onClick={() => {handleClick(1)}}>
                    General update
                </button>
            </nav>

            <div className={`${tab === 0 ? 'block' : 'hidden'} mt-10`}>
                <Listing
                    list={props?.additionalValues}
                    id_dealer={props?.partner?.id}
                />
            </div>

            <div className={`${tab === 1 ? 'flex' : 'hidden'} mt-10`}>
                <GeneralUpdate
                    partnerId={props?.partner?.id}
                    generalType={props?.partner?.general_update_type}
                    generalValue={props?.partner?.general_update_value}
                />
            </div>
        </Main>
    )
}

export default AdditionalValue;

export const getServerSideProps: GetServerSideProps<AdditionalValueInterface> = async (ctx) => {
    const {['dealerAuth.token']: token} = parseCookies(ctx); // Get the token saved in the authentication cookie
    const {['dealerAuth.id_dealer']: id_dealer} = parseCookies(ctx); // Get the token saved in the authentication cookie

    if (!token) { // If the token does not exist, redirect the client to the login page
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }

    try {
        const api = getApiDealer(ctx)
        const partner = await api.post('/partner/unique', {
            id_partner: ctx?.params?.edit,
            id_dealer: id_dealer
        })
        const additionalValues = await api.post('/partner/additional-values/all', {
            id_partner: ctx?.params?.edit
        })

        let additionalValuesData: any = [];

        additionalValues?.data?.data.map(function(row: any) {
            additionalValuesData.push({
                id: row?.id,
                partnumber: row?.partnumber,
                value: row?.value,
                type: row?.type.trim() == '1' ? 'Percentage' : `Unit price`
            })
        })


        return {
            props: {
                partner: partner?.data?.data || [],
                additionalValues: additionalValuesData
            }
        }
    } catch (e) {
        return {
            props: {
                partner: [],
                additionalValues: [],
            }
        }
    }
}