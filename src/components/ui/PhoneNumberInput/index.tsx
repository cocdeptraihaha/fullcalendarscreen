import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { PhoneNumberContainer } from "./styled";

interface PhoneNumberInputProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  defaultCountry?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  placeholder = "Enter phone number",
  defaultCountry = "",
  disabled = false,
  id,
  name,
}) => {
  return (
    <PhoneNumberContainer>
      <PhoneInput
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        defaultCountry={defaultCountry as any}
        international
        countryCallingCodeEditable
        disabled={disabled}
        nationalMode={true}
      />
    </PhoneNumberContainer>
  );
};

export default PhoneNumberInput;
