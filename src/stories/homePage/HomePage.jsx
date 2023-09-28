import React, { useState } from "react";
import { NavBar } from "../navbar/NavBar";
import { useNavigate } from "react-router-dom";
import "./homePage.css";
import { InfoBox } from "../infoBox/InfoBox";
import countries from "../../assets/countries";

export const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("USD");
  const [selectedCountryTo, setSelectedCountryTo] = useState("COP");
  const [valueFrom, setValueFrom] = useState("0");
  const [valueTo, setValueTo] = useState("0");
  const [imageFrom, setImageFrom] = useState("https://flagcdn.com/w320/us.png");
  const [imageTo, setImageTo] = useState("https://flagcdn.com/w320/co.png");

  const handleRouteClick = (url) => {
    navigate(url);
  };

  const handleCountryChange = async (event) => {
    const valueImage = countries[event.target.value];
    setImageFrom(`https://flagcdn.com/w320/${valueImage.toLowerCase()}.png`);
    setSelectedCountry(event.target.value);
  };

  const handleCountryChangeTo = async (event) => {
    const valueImage = countries[event.target.value];
    setImageTo(`https://flagcdn.com/w320/${valueImage.toLowerCase()}.png`);
    setSelectedCountryTo(event.target.value);
  };

  const handleClick = async () => {
    const res = await fetch(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_qu0kWzuGAepodNjKvPTQnkZzh5zPIRbxjNfRmTRF&base_currency=${selectedCountry}`
    );
    const data = await res.json();
    const value = data.data[selectedCountryTo];
    const result = value.value * Number(valueFrom);
    setValueTo(result.toFixed(2));
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

            <div className="money-converter__grid ">
              <div className="center">
                <span>FROM</span>
              </div>
              <div className="center">
                <span>TO</span>
              </div>
            </div>
            <div className="money-converter__grid">
              <div className="money-converter__item">
                <div className="money-convert__item__country">
                  <div className="money-convert__item__container">
                    <div className="money-convert__item__image">
                      <img src={imageFrom} alt="icon-usa" />
                    </div>
                    <span>USD</span>
                  </div>
                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    {Object.keys(countries).map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="money-converter__item gray">
                <div className="money-convert__item__country">
                  <div className="money-convert__item__container">
                    <div className="money-convert__item__image">
                      <img src={imageTo} />
                    </div>
                    <span>COL</span>
                  </div>
                  <select
                    value={selectedCountryTo}
                    onChange={handleCountryChangeTo}
                  >
                    {Object.keys(countries).map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="money-converter__item value gray">
                <input
                  className="value__convert"
                  type="text"
                  value={valueFrom}
                  onChange={(event) => setValueFrom(event.target.value)}
                />
              </div>
              <div className="money-converter__item value ">
                <span className="value__convert">{valueTo}</span>
              </div>
            </div>
            <button onClick={handleClick} className="money-converter__button">
              Exange
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
