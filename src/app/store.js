import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/homePage/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

