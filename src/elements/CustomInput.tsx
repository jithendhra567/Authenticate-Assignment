import React from "react";

type CustomInputProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  id?: string;
};

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      placeholder,
      type,
      className,
      style,
      autoFocus,
      onEnter,
      id,
    } = props;
    return (
      <input
        id={id}
        type={type}
        value={value}
        onKeyDown={(e) => (e.key === "Enter" && onEnter ? onEnter : "")}
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
