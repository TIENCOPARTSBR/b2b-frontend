import React, { ReactNode } from "react";

import styled from 'styled-components';

const TitleApp = styled.h1`
    font-family: 'Inter', sans-serif;
    color: #1D2630;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px;
    margin: 0;
    white-space: nowrap;
    
    @media(min-width: 768px) {
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
    }
`;

type TitleProps = {
    children: ReactNode;
}

const Title: React.FC<TitleProps> = ({children}) => {
    return (
        <TitleApp>{children}</TitleApp>
    )
}

export default Title;