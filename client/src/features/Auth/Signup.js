/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formValidationSchema } from '../../helpers/validators/validator';
import { fields } from '../../helpers/pageConfig/signup';
import { getInitialFormValues } from '../../helpers/utils';
import AuthTemplate from '../../components/AuthTemplate/AuthTemplate';
import Form from '../../components/Form/Form';
import { authentication, authSelector } from './authSlice';
import Toast from '../../components/Toast/Toast';

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isLoading, isAuthenticated, hasErrors, error,
  } = useSelector(authSelector);
  const formik = useFormik({
    initialValues: getInitialFormValues(fields),
    validationSchema: formValidationSchema(fields),
    onSubmit: () => {},
  });
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  });
  const validateLogin = () => {
    formik.handleSubmit();
    return formik?.isValid && formik?.dirty;
  };
  const handleLogin = async (details) => {
    if (validateLogin()) {
      try {
        dispatch(authentication({
          firstName: details.values.firstName,
          lastName: details.values.lastName,
          email: details.values.email,
          password: details.values.password,
          phoneNumber: details.values.phoneNumber,
        }));
      } catch (e) {
        console.log(e);
      }
    }
    return null;
  };
  return (
    <>
      {hasErrors && <Toast hasErrors={hasErrors} error={error} />}
      <AuthTemplate text="Already have an Account?" actionText="Login" href="/signin" title="Register" subTitle="Manage all your urls" description="Let's get you all set up so that you can" sub="start viewing all your url stats">
        {/* <button type="button" onClick={() => fetchData()}>fff</button> */}
        <Form
          id="name"
          formik={formik}
          fields={fields}
          onSubmit={(e) => { e.preventDefault(); return handleLogin(formik); }}
          cols="grid-cols-2"
          buttonSize="halved"
          btnText={isLoading ? (
            <ReactLoading
              type="spin"
              color="#ffffff"
              height={40}
              width={40}
            />
          ) : 'Submit'}
        />

      </AuthTemplate>

    </>
  );
};
export { Signup };
export default Signup;
