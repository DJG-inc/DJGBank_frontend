import React, { useState } from "react";
import { Button } from "../button/Button";
import "./Verification.css";

export const Verification = () => {
  const [inputValues, setInputValues] = useState(["", "", "", ""]);

  const handleInputChange = (index, value) => {
    // Limita la entrada a un solo dígito
    value = value.slice(0, 1);

    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSubmit = () => {
    const sum = inputValues.reduce(
      (total, value) => total + parseInt(value),
      0
    );
    console.log("Suma de los números:", sum);
  };

  return (
    <div className="container">
      {inputValues.map((value, index) => (
        <input
          className="input-verification"
          key={index}
          type="text" // Cambia el tipo a "text" para permitir un solo dígito
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
      <Button
        label="Verificar"
        primary={true}
        size="medium"
        onClick={handleSubmit}
      />
    </div>
  );
};
