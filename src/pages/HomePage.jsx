import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoHeader from "../components/LogoHeader";
import GoalSelectionDropdown from "../components/GoalSelectionDropdown";
import CompletionRate from "../components/CompletionRate";
import TowerCalendar from "../components/TowerCalendar";
import CheckList from "../components/CheckList";
import Navbar from "../components/Navbar";
import MottoCard from "../components/MottoCard";
import mainPageMockData from "../mocks/mainPage";

export default function HomePage() {
    const navigate = useNavigate();
    const [currentGoalId, setCurrentGoalId] = useState(
        mainPageMockData.length > 0 ? mainPageMockData[0].mainGoal.id : null
    );

    const currentData = mainPageMockData.find(goal => goal.mainGoal.id === currentGoalId);

    const handleCreateMainGoal = () => {
        navigate("/createmyart"); // 목적지 경로는 실제 라우터에 맞게 조정하세요.
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
            {/* LogoHeader 컴포넌트 */}
            <LogoHeader />

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-20 w-full">
                {/* 메인골이 없을 경우 대체 UI */}
                {!currentData ? (
                    <div className="w-full min-h-[calc(100vh-150px)] max-w-md text-center bg-gray-50 p-8 rounded-xl shadow-sm flex flex-col items-center justify-center">

                        {/* 로고 영역 */}
                        <img
                            src="/front-end/logo_5.png"
                            alt="Welcome Logo"
                            className="w-32 h-auto mb-8"
                        />

                        {/* 텍스트와 버튼 */}
                        <div>
                            <p className="text-xl font-semibold text-gray-800 mb-2">아직 메인골이 없어요</p>
                            <p className="text-base text-gray-600">당신의 첫 마이라트를 지금 바로 만들어보세요!</p>
                            <button
                                className="bg-customMain mt-10 text-white py-3 px-5 rounded-md shadow-lg text-sm font-bold"
                                onClick={handleCreateMainGoal}
                            >
                                마이라트 생성하러 가기
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* MottoCard 컴포넌트 */}
                        < MottoCard motto={currentData.comment} />

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
                    </>
                )}
            </div>

            {/* 네비게이션바 */}
            <Navbar initialActiveNav={1} />
        </div>
    );
}
