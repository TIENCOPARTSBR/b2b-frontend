import React, { ReactNode } from "react";
import Styled from 'styled-components';

const Button = Styled.button`
    display: flex;
    width: 100%;
    min-height: 45px;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background: #FBBB21;
    color: #FFF;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 0;

    &:hover {
        &::before {
            width: 50%;
        }

        &::after {
            width: 50%;
        }
    }

    @media(min-width: 768px) {
        height: 55px;
        padding: 15px 20px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 50%;
        width: 0;
        height: 100%;
        background-color: #F99D33;
        transition: all ease-in 200ms;
        z-index: -1;
        filter: blur(30px);
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: 0;
        height: 100%;
        background-color: #F99D33;
        transition: all ease-in 200ms;
        z-index: -1;
        filter: blur(30px);
    }
`;

type TitleProps = {
    children: ReactNode;
}

const ButtonLarge: React.FC<TitleProps> = ({children}) => {
    return (
        <Button type="submit">{children}</Button>
    )
}

export default ButtonLarge;