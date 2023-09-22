import React from "react";

import { Header } from "../header/Header";
import { Login } from "../login/Login";
import "./loginPage.css";

export const LoginPage = () => {
  // En tu componente Page
  return (
    <article> 
      <Header
        textButton="Register"
        className="header-login" // Aplica la clase CSS para el encabezado
        route="/register"
      />
      <section className="login-box">
        <Login
          text="Enter to your DJG Bank account"
          className="login-page" // Aplica la clase CSS para el registro
        />
      </section>
    </article>
  );
};
