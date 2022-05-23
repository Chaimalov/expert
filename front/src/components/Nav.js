import React from 'react'
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa"
import Login from './Login';
import { useAuth } from '../context/AuthContext';


export default function Nav() {

    const { user, loggedIn } = useAuth()

    return (
        <nav>
            <div className='right'>
                <Link to="/">home</Link>
                <Link to="/statistics">statistics</Link>
                {loggedIn && <Link to="/mylist">My list</Link>}
            </div>
            <div className='left'>
                <Login />
                {user?.photoURL && <Link to="/account">{<img src={user.photoURL} />}</Link>}
            </div>
        </nav>
    )
}
