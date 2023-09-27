import React from "react";
import { Title, ButtonConfirm, ButtonCancel, Paragraph } from "./style";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ModalToDelete = ({ show, onHide, onConfirm }: ModalProps) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Title>Excluir</Title>
            </Modal.Header>
            <Modal.Body>
                <Paragraph>Tem certeza de que deseja excluir?</Paragraph>
            </Modal.Body>
            <Modal.Footer>
                <ButtonCancel onClick={onHide}>
                    Cancelar
                </ButtonCancel>
                <ButtonConfirm onClick={onConfirm}>
                    Excluir
                </ButtonConfirm>
            </Modal.Footer>
            <style jsx global>{`
                .btn-close {
                    font-size: 12px; /* Tamanho personalizado */
                }
            `}</style>
        </Modal>
    )
}

export default ModalToDelete;