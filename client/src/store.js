// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { apiSlice } from '@slices/api/apiSlice.js';
import authReducer from '@slices/authSlice.js';
import addressReducer from '@slices/address.slice.js';
import serviceReducer from '@slices/service.slice.js';
import notificationReducer from "@slices/notificationSlice";
// Combine all your reducers
const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  address: addressReducer,
  service: serviceReducer,
  notifications: notificationReducer,   
});

// Add a wrapper rootReducer to support full state reset
const rootReducer = (state, action) => {
  if (action.type === 'global/logout') {
    storage.removeItem('persist:root'); // clears redux-persist localStorage
    return appReducer(undefined, action); // resets state
  }
  return appReducer(state, action);
};

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'address', 'service'], // persist only these
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  devTools:false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(apiSlice.middleware),
});

// Create persistor
export const persistor = persistStore(store);
