import styled from "styled-components";

export const Main = styled.main`
    padding: 40px;
`;  

export const Group = styled.div`
    width: 100%;
    margin: 0 0 2rem;

    h1 {
        margin-top: .8rem;
    }
`;

export const Card = styled.form`
    width: 100%;
    display: flex;
    flex-flow: column;
    padding: 30px;
    border-radius: 8px;
    border: 1px solid rgba(219, 224, 229, 0.65);
    box-sizing: border-box;

    &:nth-child(1n) {
        margin: 0 0 2rem;
    }

    @media (min-width: 768px) {
        input {
            width: 350px;
        }

        button {
            width: min-content;
        }
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

// para conseguir rodar o projeto
const StyleRecoverPassword = () => {
    return
}
export default StyleRecoverPassword;