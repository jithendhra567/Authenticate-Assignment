import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = () => {
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/search");
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
