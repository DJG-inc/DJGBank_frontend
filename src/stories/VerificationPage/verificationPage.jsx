import React from "react";

import { Header } from "../header/Header";
import { Verification } from "../Verification/Verification";
import "./verificationPage.css";

export const VerificationPage = () => {
    // En tu componente Page
    return (
        <article>
        <Header
            textButton="Home"
            className="header-verif" // Aplica la clase CSS para el encabezado
            route="/"
        />
        <section className="verification-box">
            <Verification
            text="Enter the security code sent to your email"
            className="verification-page" // Aplica la clase CSS para el registro
            />
        </section>
        </article>
    );
}

