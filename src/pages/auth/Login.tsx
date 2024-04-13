import React, { useState } from "react";
import CustomText from "../../elements/CustomText";
import CustomInput from "../../elements/CustomInput";
import useAuth from "../../hooks/useAuth";
import "./auth.css";
import AuthCard from "../../components/auth/AuthCard";
import CustomButton from "../../elements/CustomButton";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const { login } = useAuth();

  const handleLogin = () => {
    login(email);
  };

  return (
    <AuthCard isLogin>
      <CustomInput
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter here"
      />
      <div className="authButtons">
        <Link to={ROUTES.REGISTER}>
          <CustomText>Register</CustomText>
        </Link>
        <CustomButton onClick={handleLogin}>Login</CustomButton>
      </div>
    </AuthCard>
  );
}

export default Login;
