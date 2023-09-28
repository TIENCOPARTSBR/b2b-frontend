import styled, { keyframes } from "styled-components";
import image from "next/image";

// Define a animação usando keyframes
const spin = keyframes`
  from {
    transform: scale(0.95) translateY(80%)
  }
  to {
    transform: translateY(0)
  }
`;

export const SUCCESS = styled.div`
    display: inline-flex;
    padding: 9px 20px 9px 13px;
    flex-direction: column;
    align-items: flex-start;
    flex-flow: nowrap;
    gap: 6px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #C0E5D9;
    background: #C0E5D9;
    position: fixed;
    top: 2rem;
    right: 2rem;
    animation: ${spin} 200ms linear normal;
`;

export const H2 = styled.h2`
    color: #1E1E1E;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    margin: 0;
`;

export const P = styled.p`
    color: #1E1E1E;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    margin: 0;
`;

export const Image = styled(image)`
    width: 17px !important;
    height: 17px !important;
    object-fit: contain;
    margin: 3px 5px 0 0;
    box-sizing: border-box;
`;