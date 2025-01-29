import React, { useState } from "react";
import LogoHeader from "../components/LogoHeader";
import PagenationBar from "../components/PagenationBar";
import CompletionRate from "../components/CompletionRate";
import TowerSection from "../components/TowerSection";
import CheckList from "../components/CheckList";
import Navbar from "../components/Navbar";
import MottoCard from "../components/MottoCard";
import mainPageMockData from "../mocks/mainPage";

export default function HomePage() {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePrevious = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : mainPageMockData.length - 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => (prev < mainPageMockData.length - 1 ? prev + 1 : 0));
    };

    const currentData = mainPageMockData[currentPage];

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
            {/* LogoHeader 컴포넌트 */}
            <LogoHeader />

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-20 w-full">
                {/* MottoCard 컴포넌트 */}
                <MottoCard motto={currentData.comment} />

                {/* 페이지네이션 바 */}
                <PagenationBar
                    title={currentData.mainGoal.name}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                />

                {/* 달성률 섹션 */}
                <CompletionRate
                    lastWeek={currentData.mainGoal.lastWeek}
                    thisWeek={currentData.mainGoal.thisWeek}
                />

                {/* 한다!탑섹션 */}
                <TowerSection strict={currentData.strict} />

                {/* 체크리스트 섹션 */}
                <CheckList title={currentData.mainGoal.name} subGoals={currentData.subGoals} />
            </div>

            {/* 네비게이션바 */}
            <Navbar initialActiveNav={1} />
        </div>
    );
}
