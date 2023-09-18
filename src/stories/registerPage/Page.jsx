import React from "react";

import { Header } from "../header/Header";
import { Register } from "../register/Register";
import "./page.css";

export const Page = () => {
  // En tu componente Page
  return (
    <article>
      <Header
        textButton="Login"
        className="header" // Aplica la clase CSS para el encabezado
      />
      <section className="register-box">
        <Register
          text="Start your financial life with DJG"
          className="register" // Aplica la clase CSS para el registro
        />
      </section>
    </article>
  );
};
