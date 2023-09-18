import PropTypes from 'prop-types';
import './infoBox.css';
import { Button } from '../button/Button';

export const InfoBox = ({ title, message }) => {
  return (
    <div className="infobox">
      <h2 className="infobox-title">{title}</h2>
      <p className="infobox-message">{message}</p>
      <Button label="Register" primary={true} size="medium" />
    </div>
  );
};

InfoBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
