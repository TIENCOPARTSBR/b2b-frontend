import Styled from "styled-components";
import link from "next/link";

export const Nav = Styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const Link = Styled(link)`
    color: #5B6B79;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    margin: 0 1.5rem 0 0;
    text-decoration: none;
    position: relative;

    &::before {
        content: '/';
        position: absolute;
        top: 0;
        right: -15px;
    }

    &:last-child {
        color: #F99D33;
        pointer-events: none;

        &::before {
            display: none;
        }
    }
`;