// App.jsx
import { useEffect } from "react";
import Router from "./router/Router";
import { isAccessTokenValid } from "./utils/auth";
import { showModal } from "./utils/sessionModalController";
import SessionExpiredModal from "./components/SessionExpiredModal";
import { SessionModalProvider } from "./contexts/SessionModalContext";

export default function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        // ❌ 토큰이 없으면 (로그인 안 된 상태) 모달 띄우지 않음
        return;
      }

      const isValid = isAccessTokenValid();
      if (!isValid) {
        console.log("🕒 accessToken이 만료되었거나 유효하지 않습니다");
        localStorage.removeItem("accessToken");
        showModal();
      }
    }, 10000); // 10초마다 확인

    return () => clearInterval(interval);
  }, []);


  return (
    <SessionModalProvider>
      <Router />
      <SessionExpiredModal />
    </SessionModalProvider>
  );
}
