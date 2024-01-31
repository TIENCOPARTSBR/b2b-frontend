import Image from "next/image";

export const breadcrumb= () => [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Quotations",
        link: "/product",
    },
    {
        name: "Outstanding",
        link: "/product",
    },
];

export const TitleConst = 'Outstanding quotations';

export const ButtonsDatatable = () => [
    {
        href: '/quotation',
        name: 'Submit quotation',
        bgColor: 'bg-yellow_one',
    }
];