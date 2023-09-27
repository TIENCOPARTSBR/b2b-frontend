// assets
import React from "react";
import Image from "next/image";
import { useState } from 'react';

// style
import { Alert } from "./style";

type AlertDangerProps = {
    text: string
}

const AlertDanger = ({text}: AlertDangerProps) => {
    const [isVisible, setIsVisible] = useState(true);

    setTimeout(() => {
        setIsVisible(false);
    }, 3000);

    const handleClose = () => {
      setIsVisible(false);
    };

    return (
        <>
            {isVisible && 
            <Alert onClick={handleClose}>
                {text}
                {/* <Image 
                src="/images/close.svg"
                alt="Icone de x"
                width="18"
                height="18"/> */}
            </Alert>}
        </> 
    );
}

export default AlertDanger;