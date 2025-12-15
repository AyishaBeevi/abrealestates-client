import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

// ✅ Vite environment variable
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ----------------------------------
     Restore auth on page refresh
  ---------------------------------- */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${savedToken}`;
    }

    setLoading(false);
  }, []);

  /* ----------------------------------
     REGISTER (auto-login)
  ---------------------------------- */
  const register = async (name, email, password) => {
    await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });

    // auto login after register
    await login(email, password);
  };

  /* ----------------------------------
     LOGIN
  ---------------------------------- */
  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    const { user, token } = res.data;

    // save
    setUser(user);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  };

  /* ----------------------------------
     LOGOUT
  ---------------------------------- */
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/* ----------------------------------
   Hook
---------------------------------- */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
