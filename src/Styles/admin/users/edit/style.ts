import styled from "styled-components";

export const Main = styled.main`
    padding: 25px;

    @media(min-width: 768px) {
        padding: 40px;
    }
`;

export const Group = styled.div`
    width: min-content;
    margin: 0 0 2rem;

    h1 {
        margin-top: .8rem;
    }
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: wrap;
    padding: 30px;
    border-radius: 8px;
    border: 1px solid rgba(219, 224, 229, 0.65);
    box-sizing: border-box;

    input {
        height: 45px;
        font-size: 14px;
    }
`;

export const GroupForm = styled.div`
    width: 100%;
    margin: 0 0 .5rem;

    @media(min-width: 768px) {
        width: 49%;
    }
`;

export const Label = styled.label`
    color: #5B6B79;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    width: 100%;
    margin: 0 0 .5rem;
    display: block;
`;