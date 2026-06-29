import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

 const logout = async () => {
  try {
    await api.post("/auth/logout");

    setUser(null);

    toast.success("Logged Out Successfully");

    window.location.href = "/login";
  } catch (error) {
    toast.error("Logout Failed");
  }
};

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        getCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);