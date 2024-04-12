import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

const Authenticator: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default Authenticator;
