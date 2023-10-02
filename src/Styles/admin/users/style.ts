import styled from "styled-components";

export const Main = styled.main`
    padding: 25px;
    display: flex;
    flex-flow: wrap;

    @media (min-width: 768px) {
        padding: 40px;
    }
`;

export const CardHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin: 0 0 2rem;
    flex-flow: column;
    gap: 1.3rem;

    @media (min-width: 540px) {
        flex-flow: row;
        justify-content: space-between;
        gap: unset;
    }
`;

export const Group = styled.div`
    width: min-content;
    display: flex;
    flex-flow: wrap;
    gap: .8rem;

    @media (min-width: 768px) {
        width: unset;
        flex-flow: column;
    }
`;

export const ButtonAction = styled.button`
    background: none;
    box-shadow: none;
    border: none;
`;