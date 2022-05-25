import React from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa"
import { Login } from './Login';
import { useAuth } from '../context/AuthContext';


export function Nav() {

    const { user, loggedIn } = useAuth()

    return (
        <nav>
            <NavLink to="/">home</NavLink>
            <NavLink to="/statistics">statistics</NavLink>
            {loggedIn && <NavLink to="/mylist">My list</NavLink>}
            <div className='sep'></div>
            <Login />
            {!loggedIn
                ? <></>
                : user?.photoURL ? <NavLink to="/account"><img src={user.photoURL} /></NavLink>
                    : <FaUserAlt className='ion' />}
        </nav>
    )
}

function NavLink({ children, to }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <Link className={isActive ? "active" : ""} to={to}>{children}</Link>
    )
}