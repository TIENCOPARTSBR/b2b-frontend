import React from "react";
import { Title, ButtonConfirm, ButtonCancel, Paragraph, ModalCustom } from "./style";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

interface ModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
}

const ModalToDelete = ({ show, onHide, onConfirm }: ModalProps) => {
    return (
        <ModalCustom show={show} onHide={onHide} centered className="aqui">
            <Modal.Header closeButton>
                <Title>Delete</Title>
            </Modal.Header>
            <Modal.Body>
                <Paragraph>Are you sure you want to delete?</Paragraph>
            </Modal.Body>
            <Modal.Footer>
                <ButtonCancel onClick={onHide}>
                    Cancel
                </ButtonCancel>
                <ButtonConfirm onClick={onConfirm}>
                    Delete
                </ButtonConfirm>
            </Modal.Footer>
            <style jsx global>{`
                .btn-close {
                    font-size: 12px; /* Tamanho personalizado */
                }
            `}</style>
        </ModalCustom>
    )
}

export default ModalToDelete;