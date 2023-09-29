import styled from 'styled-components';

export const InputTypePassword = styled.input`
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

    &.invalid {
        border: 2px solid #DC2626;
        color: #DC2626;
    }
`;

export const Warning = styled.div`
    color: #DC2626;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    
    p {
        position: relative;
        margin: 0;
        padding-left: 1.3rem;

        &::before{
            content: '';
            position: absolute;
            top: 3px;
            left: 0;
            background-image: url(/icons/error-input.svg);
            background-repeat: no-repeat;
            background-size: contain;
            width: 13px;
            height: 13px;

            &:last-child{
                content: none;
            }
        }
    }
`;

export const Complete = styled.div`
    width: 100%;
    display: block;
    color: #2CA87F;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;

    &.active {
        margin: 0 0 .5rem;
    }

    p {
        position: relative;
        margin: 0;
        padding-left: 1.3rem;

        &::before{
            content: '';
            position: absolute;
            top: 3px;
            left: 0;
            background-image: url('/icons/complete-input.svg');
            background-repeat: no-repeat;
            background-size: contain;
            width: 16px;
            height: 16px;
        }
    }
`;