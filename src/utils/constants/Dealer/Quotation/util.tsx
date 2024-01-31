export const breadcrumb: [{ name: string; link: string }, { name: string; link: string }, {
    name: string;
    link: string
}] = [
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
]

export const TitlePage: string = 'Outstanding quotations';

export const ButtonDatatable = (): [{href: string, name: string, bgColor: string}] => [
    {
        href: '/quotation',
        name: 'Submit quotation',
        bgColor: 'bg-yellow_one',
    }
]