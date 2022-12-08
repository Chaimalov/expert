import React from "react";
import { FaBell, FaRegBell } from "react-icons/fa";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { Button } from "./Button";

export function Nav({ toggleMenu, menu }) {
  const { user, logOut } = useAuth();
  const { expireAlertCount } = useProducts();

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
      <div className="drawer">
        <div className="notification-bell">
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
        </div>
        <Button value="sign out" onClick={signOut} />
        <NavLink to="/account">
          <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
        </NavLink>
      </div>
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
