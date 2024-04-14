import React, { useState } from "react";
import CustomText from "../../elements/CustomText";
import CustomInput from "../../elements/CustomInput";
import useAuth from "../../hooks/useAuth";
import "./auth.css";
import AuthCard from "../../components/auth/AuthCard";
import CustomButton from "../../elements/CustomButton";
import { Link, Navigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const { login, user } = useAuth();

  const handleLogin = () => {
    login(email);
  };

  if (user) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <AuthCard isLogin>
      <CustomInput
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter here"
      />
      <div className="authButtons">
        <Link to={ROUTES.REGISTER} id="register">
          <CustomText>Register</CustomText>
        </Link>
        <CustomButton onClick={handleLogin}>Login</CustomButton>
      </div>
    </AuthCard>
  );
}

export default Login;
