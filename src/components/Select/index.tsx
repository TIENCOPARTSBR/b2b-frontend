import React, { FC } from "react";
import { SELECT } from "./style";

interface SelectProps {
  value: string[];
  options: string[];
  required: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
}

const Select: FC<SelectProps> = ({ value, options, required, onChange, className }) => {
  return (
    <select value={value} onChange={onChange} className={className} required={required}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;