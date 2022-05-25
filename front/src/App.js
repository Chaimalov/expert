import "./styles/App.css";
import React from "react";
import { Route, useLocation, Routes, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Account from "./pages/Account";
import Product from "./pages/Product";
import Nav from "./components/Nav";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";
import MyList from "./pages/MyList";

export default function App() {
  const location = useLocation();
  const { loggedIn } = useAuth()

  return (
    <div className="App">
      <ProductsProvider>
        <Nav />
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/mylist" element={loggedIn ? <MyList /> : <Navigate to="/" />} />
            <Route path="/account" element={<Account />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
          <Toaster />
        </AnimatePresence>
      </ProductsProvider>
    </div>
  );
}
