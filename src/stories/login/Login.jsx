import React, { useState } from "react";
import "./login.css"; // Asegúrate de tener un archivo CSS correspondiente
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = ({ text }) => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userid, password);
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>{text}</h2>
        <Input
          primary={true}
          type="text"
          placeholder="Enter your id"
          onChange={(e) => {
            setUserid(e.target.value);
          }}
        />
        <Input
          primary={true}
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          label="Login"
          primary={true}
          size="medium"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
