import Styled from "styled-components";
import link from "next/link";

export const Nav = Styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const Link = Styled(link)`
    width: 100%;
    color: #B4B4B4;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    margin: 0 1.5rem 0 0;
    text-decoration: none;
    position: relative;
    white-space: nowrap;
    
    &::before {
        content: '/';
        position: absolute;
        top: 0;
        right: -15px;
    }

    &:last-child {
        color: #444444;
        pointer-events: none;

        &::before {
            display: none;
        }
    }
`;