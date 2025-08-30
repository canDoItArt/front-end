import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 로그인 처리
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", {
        id: email,
        password: password,
      });

      const accessToken = res.headers["authorization"]?.split(" ")[1];
      const refreshToken = res.headers["refresh"]; // 서버에서 내려주는 키 확인 필요

      if (accessToken) localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      setUser({ email }); // 로그인 성공 시 상태 업데이트
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // 로그아웃 처리 (API 연동)
  const logout = async () => {
    try {
      // 서버에 로그아웃 요청 → refreshToken 무효화
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
      // 실패해도 클라이언트 쪽 세션 정리는 반드시 진행
    } finally {
      // 클라이언트 세션 정리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    }
  };

  // 첫 렌더링 시 토큰 검사
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser({ token });  // ✅ 토큰을 넣어주면 stable한 값
    } else {
      setUser(null);
    }
    setLoading(false);

    // 세션 만료 이벤트 처리
    const handleSessionExpired = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      alert("세션이 만료되었습니다. 다시 로그인해주세요."); // 나중에 모달로 교체 가능
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
