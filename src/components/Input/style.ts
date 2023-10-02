import Style from 'styled-components';

export const INPUT = Style.input`
    border-radius: 3px;
    border: 1px solid #EFEFEF;
    background: #FFF;
    display: flex;
    width: 100%;
    max-height: 45px; 
    padding: 15px 20px;
    align-items: center;
    box-sizing: border-box;
    color: #000;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 21px;
    outline-color: #FBBB21;
    outline-width: 1px;
    margin: 0 0 1rem;

    ::placeholder {
        color: #5B6B79;
    }

    :focus {
        outline-color: #FBBB21 !important;
    }

    &.error {
        border: 2px solid #DC2626;
        color: #DC2626;
    }

    @media (min-width: 768px) {
        font-size: 16px;
        line-height: 24px;
        max-height: 50px; 
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 400;
    }
`;