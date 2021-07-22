import React from 'react';
import PropTypes from 'prop-types';

const Title = ({
  text, moreStyles, textColor, weight, fontSize,
}) => (
  <h2
    className={`${textColor} ${weight} ${fontSize} ${moreStyles}`}

  >
    {text}
  </h2>
);

Title.defaultProps = {
  textColor: 'text-darkGrey',
  weight: 'font-medium',
  moreStyles: '',
  fontSize: 'text-2xl',
};

Title.propTypes = {
  moreStyles: PropTypes.string,
  weight: PropTypes.string,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
};

export default Title;
