import "./styles/App.css";
import React, { useState } from "react";
import { Route, useLocation, Routes, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Transitions from "./context/Transition";
import { motion, useCycle } from "framer-motion";

import { Home, Statistics, Account, Login, Product } from "./pages";

import { Nav, NotificationsMenu } from "./components";
import { useAuth } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";

export default function App() {
  const location = useLocation();
  const { loggedIn } = useAuth();
  const [menu, setMenu] = useCycle(false, true);
  const [expireAlertCount, setExpireAlertCount] = useState(0);

  if (!loggedIn) return <Login />;
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <ProductsProvider>
          <motion.div style={{ flexGrow: 1 }}>
            <Nav
              toggleMenu={setMenu}
              menu={menu}
              expireAlertCount={expireAlertCount}
            />
            <AnimatePresence exitBeforeEnter>
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <Transitions>
                      <Home />
                    </Transitions>
                  }
                />
                <Route
                  path="/account"
                  element={
                    <Transitions>
                      <Account />{" "}
                    </Transitions>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <Transitions>
                      <Product />
                    </Transitions>
                  }
                />
              </Routes>
            </AnimatePresence>
          </motion.div>
          <AnimatePresence>
            {menu && (
              <NotificationsMenu setExpireAlertCount={setExpireAlertCount} />
            )}
          </AnimatePresence>
        </ProductsProvider>
      </div>
      <Toaster />
    </div>
  );
}
