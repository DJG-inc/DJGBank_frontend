import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Button } from "../button/Button";
import "./confirmEmail.css";
import { useNavigate } from "react-router-dom";

export const ConfirmEmail = () => {
  const { token } = useParams();
  const { confirmEmail, isEmailConfirmed, user } = useAuth();
  const navigate = useNavigate();

  // Decodifica el token en Base64
  const decodedToken = atob(token);

  useEffect(() => {
    confirmEmail(decodedToken); // Utiliza el token decodificado
    console.log(decodedToken);
  }, [confirmEmail, decodedToken]);

  const handleRequestNewConfirmation = async (e) => {
    e.preventDefault();
    await confirmEmail(decodedToken); // Llama a la API para enviar una nueva confirmación
    alert("Se ha enviado un nuevo correo de confirmación");
  };

  return (
    <div className="confirm-email-container">
      {isEmailConfirmed ? (
        <div className="confirmation-success">
          <p>Correo electrónico confirmado con éxito.</p>
          <Button
            className="confirmation-button"
            label="Finish registration"
            primary={true}
            size={"medium"}
            onClick={() => navigate(`/complete-register/${user.id}`)}
          />
        </div>
      ) : (
        <div>
          <p className="confirming-message">
            Confirmando el correo electrónico...
          </p>
          <Button
            className="confirmation-button"
            label="Request new confirmation"
            primary={true}
            size={"medium"}
            onClick={handleRequestNewConfirmation}
          />
        </div>
      )}
    </div>
  );
};
