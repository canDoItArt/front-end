import { useState, useEffect } from "react";
import LogoHeader from "../components/LogoHeader";
import Navbar from "../components/Navbar";
//import myPageMockData from "../mocks/myPage";
import MottoCard from "../components/MottoCard";
import SettingsList from "../components/SettingsList";
import { BsPersonFill } from "react-icons/bs";
import api from "../api/axiosInstance";

export default function MyPage() {
    //const [currentData] = useState(myPageMockData[0]); // 첫 번째 데이터 사용

    const [userData, setUserData] = useState(null); // 사용자 정보 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        api
            .get("/api/members")
            .then((res) => {
                console.log("✅ API 성공:", res.data);
                // 응답 구조에 맞춰 data 파싱
                setUserData(res.data.data);
            })
            .catch((err) => {
                console.error("❌ API 에러:", err.response?.status, err.response?.data);
                setError("마이페이지 정보를 불러오지 못했습니다.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>불러오는 중...</p>
            </div>
        );
    }

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
                        {userData?.profileImage && userData.profileImage !== "null" && userData.profileImage.trim() !== "" ? (
                            <img
                                src={userData.profileImage}
                                alt="profile"
                                className="w-28 h-28 rounded-full object-cover mb-4"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                <BsPersonFill className="text-8xl text-gray-400" />
                            </div>
                        )}

                        <p className="text-base font-semibold">{userData?.nickname}</p>
                        <p className="text-sm text-gray-400">{userData?.email}</p>
                    </div>
                </div>
                {/* MottoCard 컴포넌트 */}
                <MottoCard motto={userData?.comment} />

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