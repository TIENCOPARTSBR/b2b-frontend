import React, { FC, useState } from "react";
import { InputTypePassword, Warning, Complete } from "./style";

interface InputProps {
  value?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  type?: string;
  name?: string;
}

const InputPassword: FC<InputProps> = ({ ...props }) => {
  // State to hold the password
  const [password, setPassword] = useState("");
  // State to hold warning messages for incomplete password requirements
  const [warning, setWarning] = useState<string[]>([]);
  // State to hold complete messages for met password requirements
  const [complete, setComplete] = useState<string[]>([]);

  // Function to validate the password based on requirements
  const validatePassword = (password: string) => {
    // Regular expressions for password requirements
    const requirements = [
      /(?=.*[A-Z])/, // At least 1 uppercase letter
      /(?=.*[0-9])/, // At least 1 number
      /(?=.*[!@#\$%\^&\*])/, // At least 1 special character (!@#$%^&*)
      /.{8,}/, // Minimum 8 characters
    ];
    // Messages corresponding to each requirement
    const messages = [
      "1 uppercase letter",
      "1 number",
      "1 special character (!@#$%^&*)",
      "Minimum 8 characters",
    ];

    // Arrays to store missing and met requirements
    const missingRequirements: string[] = [];
    const metRequirements: string[] = [];

    // Loop through requirements and check if they are met
    for (let i = 0; i < requirements.length; i++) {
      if (!requirements[i].test(password)) {
        missingRequirements.push(messages[i]); // Requirement is missing
      } else {
        metRequirements.push(messages[i]); // Requirement is met
      }
    }

    // Set warning messages for missing requirements
    setWarning(missingRequirements);
    // Set complete messages for met requirements
    setComplete(metRequirements);

    // Return true if all requirements are met, otherwise false
    return missingRequirements.length === 0;
  };

  // Event handler for password input change
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    // Update the password state
    setPassword(newPassword);
    // Validate the password and update warning and complete messages
    validatePassword(newPassword);
  };

  return (
    <>
      {/* Input field with props */}
      <InputTypePassword {...props} onChange={handleChangePassword} className={warning.length > 0 ? 'invalid' : ''} />
      {/* Display warning messages for missing requirements */}
      {warning.length > 0 && (
        <Warning>
          {warning.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </Warning>
      )}

      {/* Display complete messages for met requirements */}
      {complete && (
        <Complete className="active">
          {complete.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </Complete>
      )}
    </>
  );
};

export default InputPassword;