// style
import styled from "styled-components";

export const Alert = styled.div`
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    display: flex;
    width: 400px;
    padding: 12px 16px;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid #0fa336;
    background: #0fa336;
    position: fixed;
    top: 2rem;
    right: calc(50% - 200px);
    text-align: center;
    box-sizing: border-box;
    z-index: 1001;
`;