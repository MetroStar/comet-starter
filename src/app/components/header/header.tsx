import React, { useState, useEffect, SyntheticEvent } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../../public/img/header-logo.svg";
import { Banner, Icon, Search } from "@metrostar/warpspeed";
import styles from "./header.module.scss";
import useAuth from "../../hooks/useAuth";

export const Header = (): React.ReactElement => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, signOut } = useAuth();

  const handleMenuClick = () => {
    window.scrollTo({ top: 0 });
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const ref = document.body.classList;
    showMenu ? ref.add(styles["no-scroll"]) : ref.remove(styles["no-scroll"]);
  }, [showMenu]);

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const handleAuth = (event: SyntheticEvent) => {
    event.preventDefault();
    if (isSignedIn) {
      signOut();
      navigate("/");
    } else {
      navigate("/signin");
    }
  };

  return (
    <header
      className={`${styles["header"]} ${
        showMenu ? styles["header-active"] : ""
      }`}
    >
      <Banner id="banner" />
      <div className="usa-nav-container">
        <div>
          <Link to="/" className={styles["header-logo"]}>
            <img src={logo} alt="Logo" />
          </Link>
          <button
            className={styles["header-menu-button"]}
            onClick={handleMenuClick}
          >
            <Icon id="menu-icon" type={!showMenu ? "menu" : "close"} />
            {!showMenu ? "Menu" : "Close"}
          </button>
        </div>
        <div className={styles["header-content"]}>
          <div className={styles["header-search"]}>
            <Search id="search" type="small" placeholder="Search our Site" />
            <div className={styles["header-search-divider"]} />
            <Link id="auth-link" to="/signin" onClick={handleAuth}>
              {isSignedIn ? "Sign Out" : "Sign In"}
            </Link>
          </div>
          <nav className={styles["header-nav"]}>
            <ul>
              <li className="usa-nav__primary-item">
                <NavLink
                  id="home-link"
                  to="/"
                  className={`usa-nav__link ${
                    location.pathname === "/" ? "usa-current" : ""
                  }`}
                >
                  Home
                </NavLink>
              </li>
              {isSignedIn && (
                <li className="usa-nav__primary-item">
                  <NavLink
                    id="dashboard-link"
                    to="/dashboard"
                    className={`usa-nav__link ${
                      location.pathname === "/" ? "usa-current" : ""
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
