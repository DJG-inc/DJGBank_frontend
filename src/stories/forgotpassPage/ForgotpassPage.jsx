import React from "react";

import { Header } from "../header/Header";
import { Forgotpass } from "../forgotpass/Forgotpass";
import "./forgotpassPage.css";

export const ForgotpassPage = () => {
  // En tu componente Page
  return (
    <article> 
      <Header
        textButton="Home"
        className="header-forgot" // Aplica la clase CSS para el encabezado
        route="/"
      />
      <section className="forgot-box">
        <Forgotpass
          text="Enter your email to reset your password"
          className="forgot-page" // Aplica la clase CSS para el registro
        />
      </section>
    </article>
  );
};
