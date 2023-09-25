import React from "react";

import { Header } from "../header/Header";
import { CompleteRegister } from "../completeRegister/CompleteRegister";
import "./completeRegisterPage.css";    

export const CompleteRegisterPage = () => {
  // En tu componente Page
  return (
    <article>
      <Header
        textButton="Home"
        className="header-complete-register" // Aplica la clase CSS para el encabezado
        route="/"
      />
      <section className="complete-register-box">
        <CompleteRegister
          text="Please complete your registration"
          className="complete-register-page" // Aplica la clase CSS para el registro
        />
      </section>
    </article>
  );
};
