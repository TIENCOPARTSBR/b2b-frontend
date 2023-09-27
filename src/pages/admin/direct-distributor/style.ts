import Styled from "styled-components";

export const Main = Styled.main`
    padding: 40px;
    display: flex;
    flex-flow: wrap;
`;

export const CardHeader = Styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin: 0 0 2rem;

    @media(min-width: 1200px) {
        justify-content: space-between;
    }
`;

export const Group = Styled.div`
    display: flex;
    flex-flow: column;
    gap: .8rem;
`;

export const ButtonAction = Styled.button`
    background: none;
    box-shadow: none;
    border: none;
`;