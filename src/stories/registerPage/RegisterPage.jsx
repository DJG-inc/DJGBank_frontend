import React from "react";

import { Header } from "../header/Header";
import { Register } from "../register/Register";
import "./registerPage.css";

export const RegisterPage = () => {
  // En tu componente Page
  return (
    <article>
      <Header
        textButton="Login"
        className="header-register" // Aplica la clase CSS para el encabezado
        route="/login"
      />
      <section className="register-box">
        <Register
          text="Start your financial life with DJG"
          className="register-page" // Aplica la clase CSS para el registro
        />
      </section>
    </article>
  );
};
