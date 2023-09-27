import React, { useState } from "react";
import { NavBar } from "../navbar/NavBar";
import { useNavigate } from "react-router-dom";
import "./homePage.css";
import { InfoBox } from "../infoBox/InfoBox";
import countries from "../../assets/countries";

export const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("USD"); // Estado para mantener el país seleccionado, inicializado a 'USD'
  const [selectedCountry2, setSelectedCountry2] = useState("COP"); // Estado para mantener el país seleccionado, inicializado a 'USD'

  const handleRouteClick = (url) => {
    navigate(url);
  };

  const handleCountryChange = async (event) => {
    setSelectedCountry(event.target.value);

    const money = event.target.value;
    const res = await fetch(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_qu0kWzuGAepodNjKvPTQnkZzh5zPIRbxjNfRmTRF&base_currency=${money}`
    );
    const data = await res.json();
    console.log(data);
  };

  const handleCountryChange2 = async (event) => {
    setSelectedCountry2(event.target.value);

    const money = event.target.value;
    const res = await fetch(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_qu0kWzuGAepodNjKvPTQnkZzh5zPIRbxjNfRmTRF&base_currency=${money}`
    );
    const data = await res.json();
    console.log(data);
  };

  const routes = [
    { url: "/", label: "Home" },
    { url: "/service", label: "Service" },
    { url: "/features", label: "Feature" },
    { url: "/aboutus", label: "About Us" },
  ];

  return (
    <>
      <NavBar routes={routes} handleRouteClick={handleRouteClick} />
      <section className="page-content">
        <div className="info-box">
          <InfoBox
            title="Bank easy, bank DJG"
            message="A client-centered bank offering comprehensive financial solutions for all your monetary goals."
          />
        </div>
        <div className="money-converter">
          <div className="monet-convert__container">
            <div className="monet-convert__header">
              <h2>Money Converter</h2>
              <span>Make your money go further</span>
            </div>

            <div className="money-converter__grid">
              <div className="money-converter__item">
                <div className="money-convert__item__country">
                  <div className="money-convert__item__container">
                    <div className="money-convert__item__image">
                      <img
                      //dejar solo las primeras dos letras del pais
                        src= {`https://flagcdn.com/w320/${selectedCountry.slice(0, -1).toLowerCase()}.png`}
                      />
                    </div>
                    <span>
                      {selectedCountry}
                    </span>
                  </div>
                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country?.currency}>
                        {country?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="money-converter__item gray">
                <div className="money-convert__item__country">
                  <div className="money-convert__item__container">
                    <div className="money-convert__item__image">
                      <img 
                      src= {`https://flagcdn.com/w320/${selectedCountry2.slice(0, -1).toLowerCase()}.png`}
                      />
                    </div>
                    <span>
                      {selectedCountry2}
                    </span>
                  </div>
                  <select
                    value={selectedCountry2}
                    onChange={handleCountryChange2}
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country?.currency}>
                        {country?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="money-converter__item value gray">
                <span className="value__convert">500,5000</span>
              </div>
              <div className="money-converter__item value ">
                <span className="value__convert">500,5000</span>
              </div>
            </div>
            <button className="money-converter__button">Exange</button>
          </div>
        </div>
      </section>
    </>
  );
};
