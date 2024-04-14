import React, { useEffect, useState } from "react";
import CustomText from "../../elements/CustomText";
import CustomInput from "../../elements/CustomInput";
import useAuth from "../../hooks/useAuth";
import "./auth.css";
import AuthCard from "../../components/auth/AuthCard";
import CustomButton from "../../elements/CustomButton";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

function Register(): JSX.Element {
  const { registerUser } = useAuth();
  const [urlParams] = useSearchParams();
  const emailParam = urlParams.get("email");
  const [email, setEmail] = useState<string>(emailParam || "");

  const handleRegister = () => {
    registerUser(email);
  };

  return (
    <AuthCard>
      <CustomInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter here"
      />
      <div className="authButtons">
        <Link to={ROUTES.ROOT} id="login">
          <CustomText>Login</CustomText>
        </Link>
        <CustomButton onClick={handleRegister}>Register Now</CustomButton>
      </div>
    </AuthCard>
  );
}

export default Register;
