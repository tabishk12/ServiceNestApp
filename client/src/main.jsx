import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";

if (window.location.pathname === "/index.html") {
  window.history.replaceState(null, "", "/");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate
      loading={
        <div className="grid min-h-screen place-items-center text-slate-600">
          Loading...
        </div>
      }
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>,
);
