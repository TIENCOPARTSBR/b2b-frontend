import styled from "styled-components";

export const Main = styled.main`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;

    .modal {
        padding-left: 0 !important;
    }
`;

export const H1 = styled.h1`
    width: 100%;
    text-align: center;
    display: block;
    font-family: "Inter", sans-serif;
    font-size: 35px;
    font-style: normal;
    font-weight: 400;
    line-height: 45px;
`;

export const Admin = styled.a`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    color: #414141;
`;

// para conseguir rodar o projeto
const StyleRecoverPassword = () => {
    return
  }
export default StyleRecoverPassword;