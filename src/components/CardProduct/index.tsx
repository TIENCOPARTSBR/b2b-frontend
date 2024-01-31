'use client';
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

type ProductType = {
    id: number,
    part_number: string,
    description_br: string,
    description_en: string,
    description_es: string,
    saldo: number,
    custo_liquido: number,
    peso: number,
    local_fornecimento: string,
    moq: number,
    lead_time: number,
    ncm: string,
    is_updated: boolean,
    general_notes: string,
    hscode: string,
}

type ProductsType = {
    data: ProductType[]
}

const CardProduct = ({data}: ProductsType) => {
    return data ? (
        <>
            {data.map((index: ProductType, key: number) => (
                <div key={key} className="w-100% md:w-1/2 xl:w-450px bg-white h-auto flex flex-col border-1 border-grey_one rounded-8px overflow-hidden md:mr-8">
                    <div className={`w-100% px-25px py-20px flex flex-nowrap items-center justify-between ${index?.is_updated ? 'bg-grey_three' : 'bg-red_one' }`}>
                        <h2 className={`w-auto font-inter font-semibold text-16px text-black ${index?.is_updated ? 'text-black' : 'text-white'}`}>
                            {index?.part_number} - {index?.description_br}
                        </h2>
                            {!index?.is_updated && (
                            <p className="font-inter font-normal text-14px flex flex-nowrap items-center">
                                Item outdated

                                <Image src="/icon/icon-alert.svg"
                                       alt="Icon alert"
                                       width="16"
                                       height="16"
                                       className="ml-2" />
                            </p>
                        )}
                    </div>

                    <ul className="w-100% px-25px py-20px bg-white shadow-card_product">
                        <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                            <strong>Price:</strong> {index?.custo_liquido}
                        </li>

                        <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                            <strong>Weight:</strong> {index?.peso}
                        </li>

                        <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                            <strong>NCM:</strong> {index?.ncm}
                        </li>

                        <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                            <strong>HS Code:</strong> {index?.hscode}
                        </li>

                        <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                            <strong>General notes:</strong> {index?.general_notes}
                        </li>

                        <li className="w-100% font-inter font-normal text-14px text-black mb-2.5 flex items-center">
                            <strong>Supplying location:</strong>
                            <Image src={index?.local_fornecimento === 'USA' ? `/icon/icon-usa-flag.svg` : `/icon/icon-br-flag.svg`}
                                   alt={index?.local_fornecimento === 'USA' ? `Flag USA` : `Flag BR`}
                                   width="24"
                                   height="20"
                                   className="ml-2" />
                        </li>

                        <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                            <strong>Stock quantity:</strong> {index?.saldo}
                        </li>

                        <li className="w-100% font-inter font-normal text-14px text-black mb-2.5">
                            <strong>Lead time:</strong> {index?.lead_time}
                        </li>
                    </ul>

                    <div className="w-100% px-25px py-15px shadow-card_product flex items-center justify-between">
                        <p className={`w-4/5 font-inter font-normal text-14px flex items-center ${index?.is_updated ? 'text-green_one' : 'text-red_one'}`}>
                            <Image src={index?.is_updated ? '/icon/icon-list-green.svg' : '/icon/icon-message.svg'}
                                   alt="Task success"
                                   width="20"
                                   height="20"
                                   className="mr-2"
                            />

                            {index?.is_updated ? (
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
            ))}
        </>
    ) : null
}

export default CardProduct;