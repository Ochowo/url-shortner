import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/Signup/signUpSlice';
import urlReducer from '../features/DashBoard/urlSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  url: urlReducer,
});

export default rootReducer;
