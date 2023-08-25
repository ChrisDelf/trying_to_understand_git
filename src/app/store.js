import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/homePage/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root', // key for the localStorage
  storage, // storage mechanism
};
const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;

