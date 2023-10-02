import Styled from "styled-components";
import link from "next/link";
import image from "next/image";

export const HeaderCustom = Styled.header`
    width: 100%;
    height: 90px;
    border: 1px solid #E8E8E8;
    background: #FFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 25px;

    @media (min-width: 769px) {
        display: none !important;
    }
`;

export const Nav = Styled.nav`
    width: 260px;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    position: fixed;
    top: 0;
    left: -100%;
    height: 100%;
    background: #ffffff;
    z-index: 1100;
    padding: 25px;
    transition: ease 200ms;

    &.active {
        left: 0;

        &::before {
            opacity: 1;
        }
    }
    
    &::before {
        content: "";
        position: fixed;
        top: 0;
        right: 0;
        width: calc(100% - 260px);
        height: 100%;
        z-index: -50;
        -webkit-backdrop-filter: blur(3px);
        backdrop-filter: blur(3px);
        background: rgba(0, 0, 0, 0.15);
        opacity: 0;
        transition: ease-in 2s ease-out 100ms;

        li {
            transition: ease-in 300ms;
        }
    }
`;

export const List = Styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: column;
`;

export const ListTwo = Styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;

    .item {
        margin: 0 0 0 1rem;
    }
`;

export const Item = Styled.li`
    margin: 0 0 1.5rem;

    img {
        margin-right: 15px;
    }
`;

export const ItemTwo = Styled.li`
    margin: 0 0 0 1.5rem;
`;

export const Link = Styled(link)`
    color: #5B6B79;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    text-decoration: none;
    display: flex;
    align-items: center;
`;

export const Image = Styled(image)`
    margin: 0;
`;

export const Logo = Styled(link)`
    margin: 0 0 2rem;
`;

export const ButtonNotification = Styled(link)`
    width: 45px;
    height: 45px;
    display: none;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all ease 300ms;
    position: relative;

    >img{
        margin: 0
    }
`;

export const CountNotification = Styled.div`
    display: none;
    width: 15px;
    height: 15px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #E3A100;
    color: #FFF;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    text-decoration: none !important;
    position: absolute;
    top: 7px;
    right: 5px;
`;

export const ButtonProfile = Styled.button`
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    cursor: pointer;
`;

export const CardProfile = Styled.div`
    display: flex;
    width: 300px;
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    border-radius: 12px;
    border: 1px solid #EFEFEF;
    background: #FFFFFF;
    box-shadow: 0px 8px 24px 0px rgba(27, 46, 94, 0.12);
    position: absolute;
    top: 5rem;
    right: 3rem;
    transition: all ease-in 300ms;
`;

export const ButtonLogout = Styled.button`
    border-radius: 60px;
    border: 1px solid #FBBB21;
    background: #FBBB21;
    display: flex;
    height: 40px;
    padding: 9px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
    color: #FFF;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    cursor: pointer;
`;


export const Hamburguer = Styled.div`
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background-color: #FAFAFA;
    background-image: url('/icons/hamburguer.svg');
    background-repeat: no-repeat;
    background-position: center;
    transition: all ease-in 200ms;
    background-size: 25px;
    cursor: pointer;

    &.active {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1101;
        width: 40px;
        height: 40px;
        max-width: 40px;
        max-height: 40px;
        box-sizing: border-box;
        background-image: url('/icons/close.svg');
    }

    &>img {
        margin: 0;
    }
`;