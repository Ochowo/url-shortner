import React from 'react';
import PropTypes from 'prop-types';

const Label = ({
  text, htmlFor, moreStyles, textColor, weight,
}) => (
  <label
    className={`${textColor} ${weight} ${moreStyles}`}
    htmlFor={htmlFor}
  >
    {text}
  </label>
);

Label.defaultProps = {
  moreStyles: 'text-sm normal-case',
  textColor: 'text-grey',
  weight: 'font-normal',
};

Label.propTypes = {
  moreStyles: PropTypes.string,
  weight: PropTypes.string,
  text: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

export default Label;
