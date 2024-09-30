// Displays user information and a logout button
import styles from "../styles/User.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Call logout function if the user is authenticated
  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
