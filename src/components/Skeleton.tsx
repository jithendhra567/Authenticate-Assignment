import React from "react";

export type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
};

const Skeleton = ({ className, style }: SkeletonProps) => {
  return <div className={`skeleton ${className}`} style={style} />;
};

export default Skeleton;
