import styled from 'styled-components';

export const SELECT = styled.input`
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
        color: #5B6B79;
    }

    @media (min-width: 768px) {
        font-size: 16px;
        color: #000000;
    }
`;