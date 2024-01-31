export const LogoEnco = '/logo-enco.svg';

export const HomePage = '/';

export const Nav = () => {
    return [
        {
            icon: '/icon/icon-user.svg',
            name: 'Users',
            link: '/user',
            width: 18,
            height: 18,
        },
        {
            icon: '/icon/icon-direct-distributor.svg',
            name: 'Partners',
            link: '/partners',
            width: 22,
            height: 22,
        },
        {
            icon: '/icon/icon-product.svg',
            name: 'Products',
            link: '/product',
            width: 20,
            height: 20,
            /*subMenu: [
                {
                    name: 'Single search',
                    link: '/product'
                },
            ]*/
        },
        {
            icon: '/icon/icon-quotation.svg',
            name: 'Quotations',
            link: '/quotation',
            width: 20,
            height: 20,
            subMenu: [
                {
                    name: 'Submit a quotation',
                    link: '/quotation/new'
                },
                {
                    name: 'Outstanding quotations',
                    link: '/quotation'
                },
                {
                    name: 'Completed quotations',
                    link: '/quotation/completed'
                }
            ]
        },
        {
            icon: '/icon/icon-order.svg',
            name: 'Orders',
            link: '/order',
            width: 20,
            height: 20,
        },
        {
            icon: '/icon/icon-collecting.svg',
            name: 'Collecting',
            link: '/collecting',
            width: 20,
            height: 20,
        },
    ]
}