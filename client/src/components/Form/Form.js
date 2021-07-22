import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import FormInputField from '../FormInputField/FormInputField';

const Form = ({
  onSubmit,
  fields,
  formik,
  formStyles,
  cols,
  buttonStyle,
  btnText,
}) => (
  <form onSubmit={onSubmit} className={formStyles} autoComplete="off">
    <div
      className={`grid grid-rows-1 ${cols} gap-x-2 gap-y-4 pr-20
      `}
    >
      {fields
        .map((field) => {
          const {
            type,
            placeholder,
            options,
            hasPadedColumn,
            ...rest
          } = field;
            // eslint-disable-next-line no-nested-ternary
          return (
            <Fragment key={field?.id}>
              <FormInputField
              // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
                type={type}
                placeholder={placeholder}
                value={formik?.values[field?.id]}
                error={formik?.errors[field?.id]}
                handleBlur={formik?.handleBlur}
                handleChange={formik?.handleChange}
                touched={formik?.touched[field?.id]}
              />
              {hasPadedColumn && <div> </div>}
            </Fragment>
          );
        })}
      <div
        className={`${buttonStyle}`}
      >
        <Button
          buttonType="button"
          onClick={onSubmit}
          text={btnText}
        />
      </div>
    </div>
  </form>
);

Form.defaultProps = {
  buttonSize: 'w-full',
  inFormButton: 'show',
  cols: 'grid-cols-2',
  buttonStyle: 'mt-5',
  btnText: 'Submit',
};

Form.propTypes = {
  btnText: PropTypes.node,
  cols: PropTypes.string,
  buttonStyle: PropTypes.string,
  showBg: PropTypes.bool,
  showSummary: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  buttonSize: PropTypes.oneOf(['halved', 'full']),
  formStyles: PropTypes.string,
  inFormButton: PropTypes.oneOf(['show', 'hide']),
  hasPadedColumn: PropTypes.bool,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subTitle: PropTypes.string,
      halved: PropTypes.bool,
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      variant: PropTypes.string,
      type: PropTypes.oneOf([
        'text',
        'date',
        'password',
        'select',
        'radio',
        'email',
        'passport',
      ]).isRequired,
      placeholder: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }),
      ),
      disabled: PropTypes.bool,
    }),
  ),
  // eslint-disable-next-line react/forbid-prop-types
  formik: PropTypes.any,
};

export default Form;
