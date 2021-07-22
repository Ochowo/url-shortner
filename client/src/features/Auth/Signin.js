/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formValidationSchema } from '../../helpers/validators/validator';
import { fields } from '../../helpers/pageConfig/signin';
import { getInitialFormValues } from '../../helpers/utils';
import AuthTemplate from '../../components/AuthTemplate/AuthTemplate';
import Form from '../../components/Form/Form';
import { login, authSelector } from './authSlice';
import Toast from '../../components/Toast/Toast';
// import Label from '../../components/Label/Label';

const Signin = () => {
  const history = useHistory();
  const [errors, setError] = React.useState(false);
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
        dispatch(login({
          email: details.values.email,
          password: details.values.password,
        }));
      } catch (e) {
        console.log(e);
      }
    }
    if (hasErrors === true) {
      setError(true);
    }
    return null;
  };
  return (
    <>
      {errors && <Toast hasErrors={hasErrors} error={error} />}
      <AuthTemplate text="Already have an account?" actionText="Signup" href="/signup" title="Log in" subTitle="Welcome Back!" description="Let's get you all set up so that you can" sub="start viewing all your url stats">
        {/* <button type="button" onClick={() => fetchData()}>fff</button> */}
        <Form
          formStyles="pr-80"
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
export default Signin;
