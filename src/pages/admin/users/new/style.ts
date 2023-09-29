import Style from "styled-components";

export const Main = Style.main`
    padding: 40px;
`;

export const Group = Style.div`
    width: 100%;
    margin: 0 0 2rem;

    h1 {
        margin-top: .8rem;
    }
`;

export const Form = Style.form`
    width: 100%;
    display: flex;
    align-items: flex-start;
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

export const GroupForm = Style.div`
    width: 100%;
    margin: 0 0 .5rem;

    @media(min-width: 768px) {
        width: 49%;
    }
`;

export const Label = Style.label`
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