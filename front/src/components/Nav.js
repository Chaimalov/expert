import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { FaUserAlt, FaBell, FaRegBell } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Button } from "./Button";

export function Nav({ toggleMenu, menu, expireAlertCount }) {
  const { user, loggedIn, logOut } = useAuth();

  async function signOut() {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav>
      <NavLink to="/">
        <h2>expert</h2>
      </NavLink>
      <div className="sep"></div>
      {loggedIn && (
        <Button
          value={
            menu ? (
              <FaRegBell className="large" />
            ) : (
              <FaBell className="large" />
            )
          }
          onClick={toggleMenu}
          bubble={expireAlertCount}
        />
      )}
      {user.uid && <Button value="sign out" onClick={signOut} />}
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
