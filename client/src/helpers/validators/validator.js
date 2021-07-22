import * as Yup from 'yup';

export const formValidationSchema = (fields) => {
  const yupItemSchema = {};
  fields.forEach((field) => {
    if (field.required) {
      const errorMessage = `${field.label || field.placeholder} is required`;
      if (field.type === 'email') {
        yupItemSchema[field.id] = Yup.string().email().required(errorMessage);
      } else if (['text', 'password'].includes(field.type)) {
        yupItemSchema[field.id] = Yup.string().required(errorMessage);
      } else if (field.type === 'password') {
        yupItemSchema[field.id] = Yup.string().required(errorMessage);
      }
    }
  });
  return Yup.object().shape({
    ...yupItemSchema,
  });
};

export default { formValidationSchema };
