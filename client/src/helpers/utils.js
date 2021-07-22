/* eslint-disable no-restricted-syntax */
import axios from 'axios';

export const getInitialFormValues = (flatFields) => {
  const initialValues = {};

  flatFields.forEach((field) => {
    if (
      ['text', 'password', 'email']?.includes(field?.type)
    ) {
      initialValues[field?.id] = '';
    }
  });

  return initialValues;
};

export const destructureFormValues = (formikValues) => {
  const values = {};
  // eslint-disable-next-line guard-for-in
  for (const key in formikValues) {
    values[key] = formikValues[key]?.value || formikValues[key];
  }
  return values;
};

export const isEmpty = (value) => value === undefined
  || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0);

export const setAuthToken = (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common.authorization = token;
  } else {
    // Delete auth header if there is no token
    delete axios.defaults.headers.common.authorization;
  }
};

export default setAuthToken;
