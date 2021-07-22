/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import jwtDecode from 'jwt-decode';
import { createSlice } from '@reduxjs/toolkit';
import { isEmpty, setAuthToken } from '../../helpers/utils';
import api from '../../helpers/api';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    hasErrors: false,
    user: null,
    error: null,
  },
  reducers: {
    saveToken(state, action) {
      if (action.payload) {
        state.token = action.payload.token;
      }
    },
    clearUser: (state) => {
      state.isLoading = true;
    },
    loading: (state) => {
      state.isLoading = true;
      state.hasErrors = false;
    },
    setCurrentUser: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = !isEmpty(action.payload);
      state.user = action.payload;
    },
    logout(state) {
      state.isLoading = false;
      state.hasErrors = false;
      state.isAuthenticated = false;
      state.error = {};
    },
    setError(state, action) {
      state.isLoading = false;
      state.hasErrors = true;
      state.error = action.payload;
    },
    clearState(state) {
      state.isLoading = false;
      state.hasErrors = false;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  loading, setCurrentUser, logout, setError, clearUser, clearState, saveToken,
} = authSlice.actions;
export const authSelector = (state) => state.auth;
export default authSlice.reducer;

// eslint-disable-next-line consistent-return
export const authentication = (newUser) => async (dispatch) => {
  dispatch(loading());

  try {
    const savedUsers = JSON.parse(localStorage.getItem('user'));
    const registerUser = async () => {
      const response = await api.postApi('/api/signup', newUser);
      if (response) {
        if (response.token) {
          // Save to local storage
          const { token, user } = response;
          const userArr = savedUsers || { data: [] };

          userArr.data.push(user);
          localStorage.setItem('user', JSON.stringify(userArr));
          // Set token to local storage
          localStorage.setItem('token', token);
          const decoded = jwtDecode(localStorage.token);

          // Set token to header
          setAuthToken(token);

          // Set current user
          dispatch(setCurrentUser(decoded));
        } else {
          dispatch(setError(response.data.message));
        }
      }
    };
    if (savedUsers) {
      const result = savedUsers.data.map((userInfo) => userInfo.email);
      if (result.includes(newUser.email)) {
        return dispatch(setError('User already exist'));
      }
      registerUser();
    } else {
      return registerUser();
    }
  } catch (error) {
    dispatch(setError(error));
  }
};

export const login = (newUser) => async (dispatch) => {
  dispatch(loading());

  try {
    const savedUsers = JSON.parse(localStorage.getItem('user'));
    let userDetails;
    const loginUser = async () => {
      for (let i = 0; i < savedUsers.data.length; i += 1) {
        if (savedUsers.data[i].email === newUser.email) {
          userDetails = savedUsers.data[i];
        }
      }

      const { id } = userDetails;
      const { email } = newUser;
      const { password } = newUser;
      const oldPassoword = userDetails.encryptedPassword;
      const { firstName } = userDetails;
      const lastName = userDetails.lasName;
      const userObject = {
        id,
        email,
        password,
        oldPassoword,
        firstName,
        lastName,
      };
      const response = await api.postApi('/api/login', userObject);
      if (response) {
        if (response.token) {
          // Save to local storage
          const { token } = response;
          // const newUserArr = [...users, user];
          // Set token to local storage
          localStorage.setItem('token', token);
          const decoded = jwtDecode(localStorage.token);

          // Set token to header
          setAuthToken(token);

          // Set current user
          return dispatch(setCurrentUser(decoded));
        }
        return dispatch(setError('Login  failed'));
      }
    };
    if (savedUsers) {
      const result = savedUsers.data.map((userInfo) => userInfo.email);
      if (result.includes(newUser.email)) {
        return loginUser();
      }
      dispatch(setError('User Email failed'));
    // eslint-disable-next-line no-else-return
    } else {
      dispatch(setError('User Authentication failed'));
    }
  } catch (error) {
    dispatch(setError(error));
  }
  return null;
};
export const clearData = () => (dispatch) => {
  dispatch(clearState());
};

export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('token');
  // Remove auth header for future request
  setAuthToken(null);
  // set current user and is Authenticated to false
  dispatch(logout());
  window.location.href = '/';
};
