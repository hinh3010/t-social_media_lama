import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/auth/AuthContext.js";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
