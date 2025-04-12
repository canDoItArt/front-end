import React, { useState } from "react";
import LogoHeader from "../components/LogoHeader";
import GoalSelectionDropdown from "../components/GoalSelectionDropdown";
import CompletionRate from "../components/CompletionRate";
import TowerCalendar from "../components/TowerCalendar";
import CheckList from "../components/CheckList";
import Navbar from "../components/Navbar";
import MottoCard from "../components/MottoCard";
import mainPageMockData from "../mocks/mainPage";

export default function HomePage() {
    const [currentGoalId, setCurrentGoalId] = useState(mainPageMockData[0].mainGoal.id);

    const currentData = mainPageMockData.find(goal => goal.mainGoal.id === currentGoalId);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
            {/* LogoHeader 컴포넌트 */}
            <LogoHeader />

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-20 w-full">
                {/* MottoCard 컴포넌트 */}
                <MottoCard motto={currentData.comment} />

                {/* 목표 선택 드롭다운 */}
                <GoalSelectionDropdown
                    currentGoal={currentData.mainGoal}
                    onSelectGoal={(goal) => setCurrentGoalId(goal.id)}
                    goals={mainPageMockData.map(data => data.mainGoal)}
                />

                {/* 달성률 섹션 */}
                <CompletionRate
                    lastWeek={currentData.mainGoal.lastWeek}
                    thisWeek={currentData.mainGoal.thisWeek}
                />

                {/* 한다!탑섹션 */}
                <div className="mt-6 w-full bg-white p-4 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.05),0_-4px_6px_rgba(0,0,0,0.05)]">
                    <h3 className="text-base font-bold text-customTextBlack mb-2">한다! 공든 탑이 무너지랴</h3>
                    {/* strict 데이터를 ActivityCalendar로 전달 */}
                    <TowerCalendar strict={currentData.strict} />
                </div>

                {/* 체크리스트 섹션 */}
                <CheckList title={currentData.mainGoal.name} subGoals={currentData.subGoals} />
            </div>

            {/* 네비게이션바 */}
            <Navbar initialActiveNav={1} />
        </div>
    );
}
