// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import addressReducer from "@slices/address.slice.js";
import { apiSlice } from "@slices/Api/apiSlice.js";
import authReducer from "@slices/authSlice.js";
import notificationReducer from "@slices/notificationSlice";
import serviceReducer from "@slices/service.slice.js";
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
  if (action.type === "global/logout") {
    storage.removeItem("persist:root"); // clears redux-persist localStorage
    return appReducer(undefined, action); // resets state
  }
  return appReducer(state, action);
};

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "address", "service", apiSlice.reducerPath], // persist query cache too
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(apiSlice.middleware),
});

// Create persistor
export const persistor = persistStore(store);
