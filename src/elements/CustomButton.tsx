import React from "react";

export type CustomButtonProps = {
  children: React.ReactNode;
  style: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const CustomButton = ({
  children,
  style,
  className,
  onClick,
}: CustomButtonProps) => {
  return (
    <button onClick={onClick} style={style} className={className}>
      {children}
    </button>
  );
};

export default CustomButton;
