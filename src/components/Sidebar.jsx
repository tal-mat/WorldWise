// Renders the sidebar with navigation and content area
import React from "react";
import { Outlet } from "react-router-dom";
import AppNav from "./AppNav.jsx";
import styles from "../styles/Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <AppNav />
      <Outlet />
    </div>
  );
}

export default Sidebar;
