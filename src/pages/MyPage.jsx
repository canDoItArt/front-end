import React, { useState } from "react";
import LogoHeader from "../components/LogoHeader";
import Navbar from "../components/Navbar";
import myPageMockData from "../mocks/myPage";
import MottoCard from "../components/MottoCard";
import SettingsList from "../components/SettingsList";
import { BsPersonFill } from "react-icons/bs";

export default function MyPage() {
    const [currentData] = useState(myPageMockData[0]); // 첫 번째 데이터 사용

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
            {/* LogoHeader 컴포넌트 */}
            <LogoHeader />

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-24 w-full">

                {/* 프로필 영역 */}
                <div className="my-6 w-full flex flex-col items-center">
                    <div className="flex flex-col items-center">
                        {/* 프로필 이미지 또는 기본 아이콘 */}
                        {currentData.profile_imge ? (
                            <img
                                src={currentData.profile_imge}
                                alt="profile"
                                className="w-28 h-28 rounded-full object-cover mb-4"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                <BsPersonFill className="text-8xl text-gray-400" />
                            </div>
                        )}

                        <p className="text-base font-semibold">{currentData.nickname}</p>
                        <p className="text-sm text-gray-400">{currentData.email}</p>
                    </div>
                </div>
                {/* MottoCard 컴포넌트 */}
                <MottoCard motto={currentData.comment} />

                {/* 설정 리스트 */}
                <div className="w-full">
                    <SettingsList />
                </div>
            </div>

            {/* 네비게이션바 */}
            <Navbar initialActiveNav={3} />
        </div>
    );
}