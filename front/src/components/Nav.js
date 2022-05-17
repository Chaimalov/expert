import React from 'react'
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa"
import Login from './Login';
import { useAuth } from '../context/AuthContext';


export default function Nav() {

    const { user } = useAuth()
    console.log(user?.photoURL)

    return (
        <nav>
            <div>
                <Link to="/">home</Link>
                <Link to="/statistics">statistics</Link>
                <Login />
                <Link to="/account">{user ? <img src={user.photoURL} />
                    : <FaUserAlt className="user" />
                }</Link>
            </div>
        </nav>
    )
}
