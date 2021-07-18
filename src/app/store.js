import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
