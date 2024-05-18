import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./index.css";

const scheme = document.querySelector('meta[name="theme-color"]');
const styles = getComputedStyle(document.body);
const color = styles.getPropertyValue("--clr-primary-dark");

scheme?.setAttribute("content", color);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
