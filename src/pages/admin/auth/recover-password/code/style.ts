import Styled from "styled-components";
import Link from "next/link";

export const Main = Styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-image: url('/background/login.png');
  background-position: center;
  background-size: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 25px !important;
  }
`;

export const Card = Styled.div`
  display: flex;
  width: 542px;
  height: auto;
  padding: 50px 40px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #FFF;
  box-shadow: 0px 8px 24px 0px rgba(27, 46, 94, 0.12);
  box-sizing: border-box;
  text-align: center;

  p {
    text-align: center;
  }

  h1 {
    margin: 0 0 1.5rem;
  }
`;

export const ImageContainer = Styled.div`
  margin: 0 0 1rem;
`;

export const ButtonLoggin = Styled(Link)`
  color: #FBBB21;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-Styled: normal;
  font-weight: 500;
  line-height: 22px;
  text-decoration: none;
  margin-top: 20px;
  display: block;
`;

export const Form = Styled.form`
  width: 100%;
`;


// para conseguir rodar o projeto
const StyleRecoverPassword = () => {
  return
}
export default StyleRecoverPassword;