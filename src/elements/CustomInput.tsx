import React from "react";

type CustomInputProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
};

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    const { value, onChange, placeholder, type, className, style, autoFocus } =
      props;
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        style={style}
        ref={ref}
        autoFocus={autoFocus}
      />
    );
  }
);

export default CustomInput;
