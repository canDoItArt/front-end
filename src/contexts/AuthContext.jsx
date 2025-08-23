import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 로그인 처리
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });

      const accessToken = res.headers["authorization"]?.split(" ")[1];
      const refreshToken = res.headers["refresh"]; // 서버에서 내려주는 키 확인 필요

      if (accessToken) localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      setUser({ email });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // 로그아웃 처리
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.href = "/login";
  };

  // 첫 렌더링 시 토큰 검사
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser({}); // 단순 로그인 상태 유지
    }
    setLoading(false);

    // 세션 만료 이벤트 처리
    const handleSessionExpired = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      alert("세션이 만료되었습니다. 다시 로그인해주세요."); // 나중에 모달로 교체 가능
      window.location.href = "/login";
    };

    window.addEventListener("sessionExpired", handleSessionExpired);
    return () => window.removeEventListener("sessionExpired", handleSessionExpired);
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
