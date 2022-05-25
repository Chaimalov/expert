import "./styles/App.css";
import React from "react";
import { Route, useLocation, Routes, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import { Home, Statistics, Account, MyList, Product } from "./pages";

import { Nav } from "./components";
import { useAuth } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";

export default function App() {
  const location = useLocation();
  const { loggedIn } = useAuth()

  return (
    <div className="App">
      <Nav />
      <ProductsProvider>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/mylist" element={loggedIn ? <MyList /> : <Navigate to="/" />} />
            <Route path="/account" element={<Account />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </AnimatePresence>
        <Toaster />
      </ProductsProvider>
    </div>
  );
}
