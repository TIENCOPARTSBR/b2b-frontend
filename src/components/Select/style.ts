import Style from 'styled-components';

export const SELECT = Style.input`
    border-radius: 8px;
    border: 1px solid #EFEFEF;
    background: #FFF;
    display: flex;
    width: 100%;
    max-height: 50px; 
    padding: 15px 20px;
    align-items: center;
    box-sizing: border-box;
    color: #000;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    outline-color: #FBBB21;
    outline-width: 1px;
    margin: 0 0 1rem;

    ::placeholder {
        color: #5B6B79;
    }
`;