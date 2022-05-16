import "./App.css"
import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home"
import Statistics from "./pages/Statistics"
import Login from "./pages/Login"
import Nav from "./components/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}
