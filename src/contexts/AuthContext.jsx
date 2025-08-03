import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { isAccessTokenValid } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인 시 호출
  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  // 로그아웃 시 호출
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  // 토큰 유효성 체크 후 상태 반영
  const checkAuth = useCallback(() => {
    const valid = isAccessTokenValid();
    setIsAuthenticated(valid);
    return valid;
  }, []);

  // 앱 시작 시 초기 확인
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
