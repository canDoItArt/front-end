import { useState } from "react";
import LogoHeader from "../components/LogoHeader";
import Navbar from "../components/Navbar";
import MottoCard from "../components/MottoCard";
import SettingsList from "../components/SettingsList";
import { BsPersonFill } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";  // ✅ AuthContext 가져오기

export default function MyPage() {
    const { user, loading } = useAuth(); // ✅ Context에서 불러오기
    const [error, setError] = useState(null); // 에러 상태

    // 1️⃣ 먼저 로딩 상태 확인
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>불러오는 중...</p>
            </div>
        );
    }

    // 2️⃣ 로딩 끝났는데 로그인 안 됨
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>로그인이 필요합니다.</p>
            </div>
        );
    }

    // 3️⃣ 에러 처리
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>{error}</p>
            </div>
        );
    }

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
                        {user?.profileImage && user.profileImage !== "null" && user.profileImage.trim() !== "" ? (
                            <img
                                src={user.profileImage}
                                alt="profile"
                                className="w-28 h-28 rounded-full object-cover mb-4"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                <BsPersonFill className="text-8xl text-gray-400" />
                            </div>
                        )}

                        <p className="text-base font-semibold">{user?.nickname}</p>
                        <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                </div>
                {/* MottoCard 컴포넌트 */}
                <MottoCard motto={user?.comment} />

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