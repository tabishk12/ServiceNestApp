// src/main.jsx or src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store , persistor } from './store.js'; 
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
  </Provider>
);
