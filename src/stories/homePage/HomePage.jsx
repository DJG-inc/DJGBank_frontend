import React from "react";
import { NavBar } from "../navbar/NavBar";
import { useNavigate } from "react-router-dom";
import "./homePage.css";
import { InfoBox } from "../infoBox/InfoBox";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleRouteClick = (url) => {
    navigate(url);
  };

  const routes = [
    { url: "/", label: "Home" },
    { url: "/service", label: "Service" },
    { url: "/features", label: "Feature" },
    { url: "/aboutus", label: "About Us" }, 
    // Agrega las rutas que desees
  ];

  return (
    <article>
      <NavBar routes={routes} handleRouteClick={handleRouteClick} className="navbar-home    "/>
      <section className="info-box">
        <InfoBox
          title="Bank easy, bank DJG"
          message="A client-centered bank offering
          comprehensive financial solutions for all
          your monetary goals."
        />
      </section>
    </article>
  );
};
