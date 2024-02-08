'use client';

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

type BrandType = {
    location: string,
    cost: string,
    lead_time: string,
    is_updated: boolean,
    general_notes: string,
    balance: string,
    moq: string,
}

type ProductType = {
    part_number: string,
    weight: string,
    ncm: string,
    hscode: string,
    description_en: string,
    brands: BrandType[]
}

type ProductsType = {
    data: ProductType[]
}

const CardProduct = ({data}: ProductsType) => {
    return data ? (
        <>
            {data.map((index: ProductType, key: number) => (
                index.brands.map((subindex: any) => (
                    <div key={key}
                         className="w-100% md:w-1/2 xl:w-450px bg-white h-auto flex flex-col border-1 border-grey_one rounded-8px overflow-hidden md:mr-8">
                        <div
                            className={`w-100% px-25px py-20px flex flex-nowrap items-center justify-between ${subindex?.is_updated ? 'bg-grey_three' : 'bg-red_one'}`}>
                            <h2 className={`w-auto font-inter font-semibold text-16px text-black ${subindex?.is_updated ? 'text-black' : 'text-white'}`}>
                                {index?.part_number} - {index?.description_en}
                            </h2>
                            {!subindex?.is_updated && (
                                <p className="font-inter font-normal text-14px flex flex-nowrap items-center">
                                    Item outdated

                                    <Image src="/icon/icon-alert.svg"
                                           alt="Icon alert"
                                           width="16"
                                           height="16"
                                           className="ml-2"/>
                                </p>
                            )}
                        </div>

                        <ul className="w-100% px-25px py-20px bg-white shadow-card_product">
                            <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                                <strong>Price:</strong> {subindex?.cost}
                            </li>

                            <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                                <strong>Weight:</strong> {index?.weight}
                            </li>

                            <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                                <strong>NCM:</strong> {index?.ncm}
                            </li>

                            <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                                <strong>HS Code:</strong> {index?.hscode}
                            </li>

                            <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                                <strong>General notes:</strong> {subindex?.general_notes}
                            </li>

                            <li className="w-100% font-inter font-normal text-14px text-black mb-2.5 flex items-center">
                                <strong>Supplying location:</strong>
                                <Image
                                    src={subindex?.location === 'USA' ? `/icon/icon-usa-flag.svg` : `/icon/icon-br-flag.svg`}
                                    alt={subindex?.location === 'USA' ? `Flag USA` : `Flag BR`}
                                    width="24"
                                    height="20"
                                    className="ml-2"/>
                            </li>

                            <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                                <strong>Stock quantity:</strong> {subindex?.balance}
                            </li>

                            <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                                <strong>Lead time:</strong> {subindex?.lead_time}
                            </li>
                        </ul>

                        <div className="w-100% px-25px py-15px shadow-card_product flex items-center justify-between">
                            <p className={`w-4/5 font-inter font-normal text-14px flex items-center ${subindex?.is_updated ? 'text-green_one' : 'text-red_one'}`}>
                                <Image
                                    src={subindex?.is_updated ? '/icon/icon-list-green.svg' : '/icon/icon-message.svg'}
                                    alt="Task success"
                                    width="20"
                                    height="20"
                                    className="mr-2"
                                />

                                {subindex?.is_updated ? (
                                    'Item available to quote'
                                ) : (
                                    'Update this item by submiting a quotation'
                                )}
                            </p>

                            <Link href="#" className="w-1/1 border-l-1 border-grey_one pl-25px">
                                <Image src="/icon/icon-gallery.svg"
                                       alt="Icon gallery"
                                       width="20"
                                       height="20"
                                       className="mr-2"
                                />
                            </Link>
                        </div>
                    </div>
                ))
            ))}
        </>
    ) : null
}

export default CardProduct;