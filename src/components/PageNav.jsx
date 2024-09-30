// Renders the navigation bar with links and a logo
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/PageNav.module.css";
import Logo from "./Logo.jsx";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <Logo />
        <ul className={styles.navLinks}>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PageNav;
