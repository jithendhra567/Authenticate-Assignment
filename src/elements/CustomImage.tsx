import React from "react";

export type CustomImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

const CustomImage = ({ src, alt, className, style }: CustomImageProps) => {
  return <img src={src} alt={alt} className={className} style={style} />;
};

export default CustomImage;
