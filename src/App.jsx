import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { showModal } from "./utils/sessionModalController";
import Router from "./router/Router";
import SessionExpiredModal from "./components/SessionExpiredModal";
import { SessionModalProvider } from "./contexts/SessionModalContext";

export default function App() {
  const { isAuthenticated, checkAuth, logout } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAuthenticated) return;

      const stillValid = checkAuth();
      if (!stillValid) {
        console.log("🕒 accessToken이 만료되었습니다");
        logout();
        showModal(); // 모달로 사용자에게 알림
      }
    }, 10000); // 10초마다 검사

    return () => clearInterval(interval);
  }, [isAuthenticated, checkAuth, logout]);

  return (
    <SessionModalProvider>
      <Router />
      <SessionExpiredModal />
    </SessionModalProvider>
  );
}
