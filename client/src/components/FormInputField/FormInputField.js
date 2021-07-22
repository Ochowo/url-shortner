import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Container/Container';
import Label from '../Label/Label';
import InputField from '../InputField/InputField';

const FormInputField = ({
  id,
  label,
  value,
  type,
  error,
  handleBlur,
  handleChange,
  placeholder,
  halved,
  touched,
  disabled,
  showSummary,
}) => {
  const length = halved ? 'col-span-1' : 'col-span-2';
  return (
    <Container flexDirection="flex-col" moreStyles={`${length}`}>
      {label && (
        <Label
          text={label}
          htmlFor={id}
          textColor="text-grey3"
          weight="font-normal"
          moreStyles={`text-sm ${length}`}
        />
      )}
      <InputField
        type={type}
        id={id}
        error={error}
        touched={touched}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
        moreStyles="w-full text-sm text-grey3"
        disabled={disabled}
        showSummary={showSummary}
      />
      {error && touched && (
        <Label
          text={error}
          textColor="text-error"
          moreStyles="text-sm"
          htmlFor="inputError"
        />
      )}
    </Container>
  );
};

FormInputField.propTypes = {
  halved: PropTypes.bool,
  showSummary: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(['number', 'email', 'password', 'text', 'date'])
    .isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  touched: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormInputField;
