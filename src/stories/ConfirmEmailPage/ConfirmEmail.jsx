import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // Importa el contexto de autenticación
import { Button } from "../button/Button";
import "./confirmEmail.css"; // Importa el archivo CSS que contiene los estilos
import { useNavigate } from "react-router-dom";

export const ConfirmEmail = () => {
  const { token } = useParams();
  const { confirmEmail, isEmailConfirmed, user } = useAuth(); // Accede a la función confirmEmail y al estado isEmailConfirmed desde el contexto
  const navigate = useNavigate();

  useEffect(() => {
    confirmEmail(token);
    console.log(token);
  }, [confirmEmail, token]);

  const handleRequestNewConfirmation = () => {
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
          {/* Puedes mostrar un mensaje de carga o animación */}
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
}