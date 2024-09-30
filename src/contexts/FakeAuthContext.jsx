import React, { createContext, useContext, useReducer } from "react";

// Create an AuthContext to provide authentication state and methods
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

// Reducer function to handle authentication actions
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: "",
      };
    case "loginError":
      return { ...state, error: action.payload };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, error: "" };
    default:
      throw new Error("Unknown action");
  }
}

// Fake user data for authentication simulation
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// AuthProvider component to manage authentication state and actions
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // Function to log in a user with email and password
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      dispatch({
        type: "loginError",
        payload:
          "Login failed. Please check your email and password and try again.",
      });
    }
  }

  // Function to log out the current user
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication context
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
