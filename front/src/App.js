import { AnimatePresence, motion, useCycle } from "framer-motion";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import Transitions from "./context/Transition";
import "./styles/App.css";

import { Account, Home, Loading, Login, Product } from "./pages";

import { Nav, NotificationsMenu } from "./components";
import { useAuth } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";

export default function App() {
  const location = useLocation();
  const { loggedIn } = useAuth();
  const [menu, setMenu] = useCycle(false, true);

  if (loggedIn === "pending") return <Loading />;
  if (!loggedIn) return <Login />;
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <ProductsProvider>
          <motion.div style={{ flexGrow: 1 }}>
            <Nav toggleMenu={setMenu} menu={menu} />
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
          <AnimatePresence>{menu && <NotificationsMenu />}</AnimatePresence>
        </ProductsProvider>
      </div>
      <Toaster />
    </div>
  );
}
