import React from "react";
import { INPUT } from "./style";

type InputProps = {
    type: string;
    name: string;
    placeholder: string;
    value: '';
    onChange: any;
    required: boolean;
}

const Input = ({type, name, placeholder, value, onChange, required}: InputProps) => {
    return (
        <INPUT type={type} name={name} placeholder={placeholder} onChange={onChange} required={required}  value={value} />
    )
}

export default Input;