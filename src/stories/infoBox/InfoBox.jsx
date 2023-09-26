import PropTypes from 'prop-types';
import './infoBox.css';
import { Button } from '../button/Button';
import { useNavigate } from 'react-router-dom';

export const InfoBox = ({ title, message }) => {
  const navigate = useNavigate();
  return (
    <div className="infobox">
      <h2 className="infobox-title">{title}</h2>
      <p className="infobox-message">{message}</p>
      <Button label="Register" primary={true} size="medium" onClick={() => navigate('/register')} />
    </div>
  );
};

InfoBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
