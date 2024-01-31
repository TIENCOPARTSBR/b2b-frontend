export const LogoEnco = '/logo-enco.svg';

export const HomePage = '/admin';
export const Nav = () => {
    return [
        {
            icon: '/icon/icon-user.svg',
            name: 'Users',
            link: '/admin/user',
            width: 18,
            height: 18,
        },
        {
            icon: '/icon/icon-direct-distributor.svg',
            name: 'Dealer',
            link: '/admin/dealer',
            width: 22,
            height: 22,
        },
    ]
}