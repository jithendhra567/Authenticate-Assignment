import React from "react";

export type CustomButtonProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, style, className, onClick }, ref) => {
    return (
      <button ref={ref} onClick={onClick} style={style} className={className}>
        {children}
      </button>
    );
  }
);

export default CustomButton;
