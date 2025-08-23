import { useAuth } from "./contexts/AuthContext";
import { SessionModalProvider } from "./contexts/SessionModalContext";
import Router from "./router/Router";
import SessionExpiredModal from "./components/SessionExpiredModal";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <SessionModalProvider>
      <Router />
      <SessionExpiredModal />
    </SessionModalProvider>
  );
}
