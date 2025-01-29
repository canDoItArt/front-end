import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ initialActiveNav = 1 }) {
  const [activeNav, setActiveNav] = useState(initialActiveNav); // 초기값을 props로 설정
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  useEffect(() => {
    // props로 전달된 초기 activeNav 값을 적용
    setActiveNav(initialActiveNav);
  }, [initialActiveNav]);

  const handleNavigation = (navIndex, path) => {
    setActiveNav(navIndex); // 상태 먼저 업데이트
    navigate(path); // 페이지 이동
  };

  return (
    <nav className="fixed bottom-0 w-full max-w-[480px] z-10 bg-customNavbar border-t-0.1 border-customNavbarStroke mx-auto">
      <div className="flex justify-between px-10 py-2">
        {/* 홈 */}
        <div className="w-16 h-auto">
          <div
            className="flex flex-col items-center text-xxs font-pre font-normal cursor-pointer"
            onClick={() => handleNavigation(1, "/home")}
          >
            <img
              src={
                activeNav === 1
                  ? "/front-end/home_1.png"
                  : "/front-end/home_2.png"
              }
              alt="home"
              className="w-10 h-auto items-center"
            />
            <span
              className={
                activeNav === 1
                  ? "text-customMain font-bold"
                  : "text-customNavbarText"
              }
            >
              홈
            </span>
          </div>
        </div>
        {/* 마이라트 */}
        <div className="w-16 h-auto">
          <div
            className="flex flex-col items-center text-xxs font-pre font-normal cursor-pointer"
            onClick={() => handleNavigation(2, "/myartlist")}
          >
            <img
              src={
                activeNav === 2
                  ? "/front-end/myart_1.png"
                  : "/front-end/myart_2.png"
              }
              alt="myartlist"
              className="w-10 h-auto items-center"
            />
            <span
              className={
                activeNav === 2
                  ? "text-customMain font-bold"
                  : "text-customNavbarText"
              }
            >
              마이라트
            </span>
          </div>
        </div>
        {/* 마이페이지 */}
        <div className="w-16 h-auto">
          <div
            className="flex flex-col items-center text-xxs font-pre font-normal cursor-pointer"
            onClick={() => handleNavigation(3, "/mypage")}
          >
            <img
              src={
                activeNav === 3
                  ? "/front-end/mypage_1.png"
                  : "/front-end/mypage_2.png"
              }
              alt="mypage"
              className="w-10 h-auto items-center"
            />
            <span
              className={
                activeNav === 3
                  ? "text-customMain font-bold"
                  : "text-customNavbarText"
              }
            >
              마이페이지
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
