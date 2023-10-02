import styled from "styled-components";

export const Main = styled.main`
    padding: 25px;
    display: flex;
    flex-flow: wrap;

    @media(min-width: 768px) {
        padding: 40px;
    }
`;

export const CardHeader = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
    gap: 1.3rem;
    align-items: flex-start;
    margin: 0 0 2rem;

    @media(min-width: 540px) {
        flex-flow: wrap;
        justify-content: space-between;
    }
`;

export const Group = styled.div`
    display: flex;
    flex-flow: column;
    gap: .8rem;
`;

export const ButtonAction = styled.button`
    background: none;
    box-shadow: none;
    border: none;
`;