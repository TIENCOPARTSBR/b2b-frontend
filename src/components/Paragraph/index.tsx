import React, { ReactNode } from "react";
import Style from "styled-components";

const PARAGRAPH = Style.p`
    color: #5B6B79;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    width: 100%;
    text-align: left;
    margin: 0 0 2rem;
`;

type ParagraphProps = {
    children: ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({children}) => {
    return (
        <PARAGRAPH>{children}</PARAGRAPH>
    )
}

export default Paragraph;