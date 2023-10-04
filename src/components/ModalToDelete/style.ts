import styled from "styled-components";
import { Modal } from 'react-bootstrap';

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1rem;
  color: #1d2630;
  font-family: "Inter", sans-serif;
  margin: 0;
`;

export const ButtonConfirm = styled.button`
  display: flex;
  padding: 9px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  background: #FBBB21;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
  color: #FFF;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  border: none;
`;

export const ButtonCancel = styled.button`
  display: flex;
  padding: 9px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  border: 1px solid #CFD1D4;
  background: #FFF;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  color: #1E1E1E;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

export const Paragraph = styled.p`
  color: #1E1E1E;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  margin: 0;
`;

export const ModalCustom = styled(Modal)`
  transform: translateZ(50%) translateX(-50%) rotateY(180deg);
  transform-style: preserve-3d;
  transform-origin: 0 100%;
  opacity: 0;
  transition: all 0.3s;

  &.show {
    transform: translateZ(0px) translateX(0%) rotateY(0deg);
    opacity: 1;
  }
`;