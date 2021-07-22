import PropTypes from 'prop-types';
import React from 'react';

const InputField = ({
  type,
  id,
  placeholder,
  name,
  value,
  error,
  moreStyles,
  onChange,
  width,
  onBlur,
  touched,
  disabled,
}) => (
  <input
    width={width}
    type={type}
    id={id}
    placeholder={placeholder}
    name={name}
    value={value || ''}
    onBlur={onBlur}
    error={error}
    onChange={onChange}
    disabled={disabled}
    className={
      error && touched
        ? `border border-error font-medium p-2 rounded-md form-input focus:focus-input focus:border-2 text-error${
          moreStyles}`
        : `${
          'border border-grey font-medium p-2 rounded-md form-input focus:focus-input '
        }
  
          ${moreStyles}`
    }
  />
);

InputField.propTypes = {
  type: PropTypes.oneOf(['number', 'email', 'password', 'text', 'date'])
    .isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  width: PropTypes.string,
  moreStyles: PropTypes.string,
  touched: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default InputField;
