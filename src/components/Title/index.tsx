import React, { ReactNode } from "react";

import styled from 'styled-components';

const TitleApp = styled.h1`
    font-family: 'Inter', sans-serif;
    color: #1D2630;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
    margin: 0;
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