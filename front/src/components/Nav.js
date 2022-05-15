import React from 'react'
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <div>
                <Link to="/">home</Link>
                <Link to="/statistics">statistics</Link>
            </div>
        </nav>
    )
}
