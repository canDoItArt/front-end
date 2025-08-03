import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { AuthProvider } from "./contexts/AuthContext"; // ✅ 꼭 import!

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* ✅ 여기가 중요 */}
      <App />
    </AuthProvider>
  </StrictMode>
)
