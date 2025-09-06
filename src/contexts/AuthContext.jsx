import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 회원정보 최신화 함수
  const fetchUser = async () => {
    try {
      const res = await api.get("/api/members");
      setUser(res.data.data);  // 최신 데이터로 갱신
    } catch (error) {
      console.error("❌ fetchUser error:", error);
      setUser(null);
    }
  };

  // 로그인 처리
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", {
        id: email,
        password: password,
      });

      // 토큰 저장
      const accessToken = res.headers["authorization"]?.split(" ")[1];
      const refreshToken = res.headers["refresh"];
      if (accessToken) localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      // 로그인 후 회원정보 저장
      const userData = res.data.data;
      setUser(userData);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // 로그아웃 처리
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

    const initAuth = async () => {
      if (token) {
        await fetchUser();   // 비동기 완료 후에만 user 갱신
      } else {
        setUser(null);
      }
      setLoading(false);  // 여기서 false
    };

    initAuth();

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
    <AuthContext.Provider value={{ user, login, logout, fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
