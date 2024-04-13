import React, { useState } from "react";
import CustomText from "../../elements/CustomText";
import CustomInput from "../../elements/CustomInput";
import useAuth from "../../hooks/useAuth";

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const { login } = useAuth();

  const handleLogin = () => {
    login(email);
  };

  return (
    <div>
      <CustomText>Login</CustomText>
      <CustomInput
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
