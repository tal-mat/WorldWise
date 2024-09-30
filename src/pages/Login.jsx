// Login component for user authentication with email and password fields
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/FakeAuthContext.jsx";
import Button from "../components/Button.jsx";
import Message from "../components/Message.jsx";

export default function Login() {
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  // Navigate to "/app" if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Navigate to "/app" and replace the current entry in the browser’s history stack with the new route.
      // This means the previous page (e.g., the login page) will be effectively skipped if the user presses the back button,
      // providing a smoother navigation experience.
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handles form submission by calling login func if email and password are provided
  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>

      {/* Display an error message if there's an error */}
      {error && <Message message={error} />}
    </main>
  );
}
