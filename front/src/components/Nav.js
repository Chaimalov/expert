import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { FaUserAlt, FaBell } from "react-icons/fa";
import { Login } from "./Login";
import { useAuth } from "../context/AuthContext";
import { Button } from "./Button";

export function Nav({ toggleMenu, expireAlertCount }) {
  const { user, loggedIn } = useAuth();

  return (
    <nav>
      <NavLink to="/">home</NavLink>
      <NavLink to="/statistics">statistics</NavLink>
      {loggedIn && <NavLink to="/mylist">My list</NavLink>}
      <div className="sep"></div>
      {loggedIn && (
        <Button
          value={<FaBell className="large" />}
          onClick={toggleMenu}
          bubble={expireAlertCount}
        />
      )}
      <Login />
      {!loggedIn ? (
        <></>
      ) : user.photoURL ? (
        <NavLink to="/account">
          <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
        </NavLink>
      ) : (
        <FaUserAlt className="ion" />
      )}
    </nav>
  );
}

function NavLink({ children, to }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link className={isActive ? "active" : ""} to={to}>
      {children}
    </Link>
  );
}
