// src/contexts/SessionModalContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { setShowModalFunction } from "../utils/sessionModalController"; // ✅ 추가

const SessionModalContext = createContext();

export const SessionModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // ✅ 전역 함수 등록
  useEffect(() => {
    setShowModalFunction(showModal);
  }, []);

  return (
    <SessionModalContext.Provider value={{ visible, showModal, hideModal }}>
      {children}
    </SessionModalContext.Provider>
  );
};

export const useSessionModal = () => useContext(SessionModalContext);
