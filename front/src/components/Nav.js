import React from 'react'
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa"

export default function Nav() {
    return (
        <nav>
            <div>
                <Link to="/">home</Link>
                <Link to="/statistics">statistics</Link>
                <Link to="/login"><FaUserAlt/></Link>
            </div>
        </nav>
    )
}
