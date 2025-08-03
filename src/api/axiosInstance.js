// api/axiosInstance.js
import axios from "axios";
import { showModal } from "../utils/sessionModalController";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    console.log("❗응답 상태코드:", status);

    if (status === 401) {
      // ✅ 세션 만료: 토큰 삭제하고 모달 표시
      localStorage.removeItem("accessToken");
      showModal(); // 로그인 페이지로 유도
    }

    return Promise.reject(error);
  }
);

export default api;
