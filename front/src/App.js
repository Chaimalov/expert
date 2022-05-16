import "./App.css"
import React from 'react'
import { Route, useLocation, Routes } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

import Home from "./pages/Home"
import Statistics from "./pages/Statistics"
import Login from "./pages/Login"
import Nav from "./components/Nav";

export default function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Nav />
      <AnimatePresence exitBeforeEnter >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
