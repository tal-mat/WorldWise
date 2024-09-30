import React from "react";
import styles from "../styles/PageNotFound.module.css";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>
        Oops! 😢 The page you're looking for doesn't exist.
      </p>
      <Link to="/" className={styles.homeButton}>
        Go Back to Home
      </Link>
    </div>
  );
}
