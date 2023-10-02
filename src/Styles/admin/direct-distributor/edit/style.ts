import styled from "styled-components";

export const Main = styled.main`
    padding: 25px;

    @media (min-width: 768px) {
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
        width: 32.3%;
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

export const Select = styled.select`
    border-radius: 8px;
    border: 1px solid #EFEFEF;
    background: #FFF;
    display: flex;
    width: 100%;
    max-height: 50px; 
    padding: 15px 20px;
    align-items: center;
    box-sizing: border-box;
    color: #868686;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    outline-color: #FBBB21;
    outline-width: 1px;
    margin: 0 0 1rem;

    ::placeholder {
        color: #000;
        color: #5B6B79;
    }

    @media (min-width: 768px) {
        font-size: 16px;
    }
`;