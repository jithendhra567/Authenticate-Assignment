import React from "react";

type CustomInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  style?: React.CSSProperties;
};

const CustomInput = ({
  value,
  onChange,
  type = "text",
  className,
  style,
  placeholder,
}: CustomInputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      style={style}
    />
  );
};

export default CustomInput;
