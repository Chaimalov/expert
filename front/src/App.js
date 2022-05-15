import "./App.css"
import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home"
import Statistics from "./pages/Statistics"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/statistics" element={<Statistics />} />
    </Routes>
  )
}
