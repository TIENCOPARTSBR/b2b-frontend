import React, { ReactNode } from "react";
import Styled from 'styled-components';

const Button = Styled.button`
    display: flex;
    width: 100%;
    height: 55px;
    padding: 15px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #FBBB21;
    color: #FFF;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    border: none;
    cursor: pointer;
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