import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { CartStateProvider } from "./contexts/CartContext";
import { DataProvider } from "./contexts/DataContext.js";

ReactDOM.render(
  <AuthProvider>
    <DataProvider>
      <CartStateProvider>
        <App />
      </CartStateProvider>
    </DataProvider>
  </AuthProvider>,
  document.getElementById("root")
);
