import Styled from "styled-components";
import link from "next/link";

export const Button = Styled(link)`
    border-radius: 60px;
    background: #FBBB21;
    padding: 9px 16px;
    border-radius: 60px;
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
    color: #FFF;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    text-decoration: none;
    transition: ease all 300ms;

    &:hover {
        background-color: #FBBB21;
    }
`;