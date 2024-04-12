import React from "react";

export type TextProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

// Text component for getting control over the text for entire app.
// so we can change the style/theme of the text in one place.

// React memo is not required here. it is just add another layer of checking which has no expensive computation.

const Text = ({ children, style, className }: TextProps): JSX.Element => {
  return (
    <p className={className} style={style}>
      {children}
    </p>
  );
};

export default Text;
