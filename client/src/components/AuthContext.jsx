// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("http://localhost:4000/validate", {
          credentials: "include",
        });
        if (response.ok) {
          const userInfo = await response.json();
          setUsername(userInfo.username);
        } else {
          setUsername(null);
        }
      } catch (error) {
        console.error("Failed to validate user:", error);
        setUsername(null);
      }
    }

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        setUsername(username);
        navigate('/');
        return true;
      } else {
        const error = await response.json();
        throw new Error(error.message || "login failed");
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const logout = async () => {
    await fetch("http://localhost:4000/logout", {
      method: 'POST',
      credentials: "include",
    });
    setUsername(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
