import React from "react";
import { FaBell, FaRegBell } from "react-icons/fa";
import { Link, To, useMatch, useResolvedPath } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { Button } from "./Button";

type NavProps = {
  toggleMenu: () => void;
  menu: boolean;
};

export const Nav: React.FC<NavProps> = ({ toggleMenu, menu }) => {
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
          <Button onClick={toggleMenu} bubble={expireAlertCount}>
            {menu ? (
              <FaRegBell className="large" />
            ) : (
              <FaBell className="large" />
            )}
          </Button>
        </div>
        <Button value="sign out" onClick={signOut} />
        <NavLink to="/account">
          <img
            src={user.photoURL ?? undefined}
            alt=""
            referrerPolicy="no-referrer"
          />
        </NavLink>
      </div>
    </nav>
  );
};

type NavLinkProps = {
  to: To;
};

const NavLink: React.FC<React.PropsWithChildren<NavLinkProps>> = ({
  children,
  to,
}) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link className={isActive ? "active" : ""} to={to}>
      {children}
    </Link>
  );
};
