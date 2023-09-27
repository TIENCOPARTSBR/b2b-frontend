// assets
import React from "react";

// style
import { Alert } from "./style";

type AlertSuccessProps = {
    text: string
}

const AlertSuccess = ({text}: AlertSuccessProps) => {
    return (
        <Alert>{text}</Alert>
    );
}

export default AlertSuccess;