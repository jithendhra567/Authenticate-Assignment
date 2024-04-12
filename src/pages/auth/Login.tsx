import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../../elements/Text";
import CustomInput from "../../elements/CustomInput";

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/search");
  };

  return (
    <div>
      <Text>Login</Text>
      <CustomInput
        value=""
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
