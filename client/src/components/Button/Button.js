/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  type, className, onClick, text,
}) => (
  <button type={type} className={className} onClick={onClick}>
    {text}
    {' '}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

Button.defaultProps = {
  type: 'submit',
  onClick: () => {},
  className: 'bg-mainBlue rounded text-white w-4/6 p-2',
};

export default Button;
