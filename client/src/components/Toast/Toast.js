import React from 'react';
import PropType from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ hasErrors, error }) {
  const notify = () => toast(error);

  if (hasErrors) {
    notify();
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        type="error"
      />
    </div>
  );
}
Toast.propTypes = {
  hasErrors: PropType.bool,
  error: PropType.string,
};
export default Toast;
