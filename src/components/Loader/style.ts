import styled, { keyframes } from 'styled-components';

export const DivLoader = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const spinAnimation = keyframes`
    100% {
        transform: rotate(1turn);
    }
`;

export const Load = styled.div`
    width: 25px;
    height: 25px;
    display: grid;
    animation: ${spinAnimation} 4s infinite;

    &::before,
    &::after {
    content: "";
    grid-area: 1/1;
    border: 4px solid;
    border-radius: 50%;
    border-color: #fbbb21 #fbbb21 #0000 #0000;
    mix-blend-mode: darken;
    animation: ${spinAnimation} 1s infinite linear;
    }

    &::after {
    border-color: #0000 #0000 #e4e4ed #e4e4ed;
    animation-direction: reverse;
    }
`;