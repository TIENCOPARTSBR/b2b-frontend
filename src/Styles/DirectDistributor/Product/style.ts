import Image from 'next/image';
import { styled } from 'styled-components';

export const GroupForm = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row;
    margin: 1rem 0 0 0;

    &>input {
        font-size: 14px;

        &:active,
        &:focus,
        &::content{
            outline-color: #FBBB21;
        }
    }
`;

export const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-flow: wrap;
    margin: 1rem 0 0 0;
    gap: 2rem;
`;  

export const CardProduct = styled.div`
    width: 100%;
    display: flex;
    flex-flow: wrap;
    border-radius: 3px;
    border: 1px solid #EFEFEF;
    padding: 25px;
    box-sizing: border-box;

    &.warning {
        border: 2px solid red;
    }

    @media (min-width:  768px) {
        width: 47.9%;
        padding: 30px;
        border-radius: 8px;
    }

    @media (min-width:  1140px) {
        width: 33.3%;
    }
`;

export const PartNumber = styled.h2`
    font-size: 16px;
    line-height: 21px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    color: #212121;
    margin: 0 0 1rem;

    @media (min-width: 768px) {
        font-size: 19px;
        line-height: 27px;
        font-weight: 600;
    }
`;

export const List = styled.ul`
    width: 100%;
    margin: 0 0 1rem;
    padding: unset;
    list-style: none;
`;

export const Item = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 17px;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    color: #515151;
    margin: 0 0 .5rem;

    &>strong {
        margin-right: 5px;
        font-weight: 600;
    }

    &.space-in-left {
        padding-left: 1rem;
    }

    @media (min-width: 768px) {
        font-size: 14px;
        line-height: 21px;
    }
`;

export const Flag = styled(Image)`
    margin: 0 .5rem;
`;

export const Warning = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 1rem 0 0 0;
    font-size: 13px;
    line-height: 19px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    color: red;

    @media (min-width: 768px) {
        font-size: 14px;
        line-height: 24px;
        font-weight: 600;
    }
`;

export const Icon = styled(Image)`
    margin-right: 10px;
`;