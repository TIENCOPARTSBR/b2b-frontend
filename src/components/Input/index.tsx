import React, { FC } from "react";
import { INPUT } from "./style";

interface InputProps {
    value: string;
    placeholder: string;
    required: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
}

const Input: FC<InputProps> = ({...props }) => {
    return <INPUT {...props} />  ;
};

export default Input;