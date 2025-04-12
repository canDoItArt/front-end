import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoHeader from "../components/LogoHeader";
import Navbar from "../components/Navbar";
import MottoCard from "../components/MottoCard";
import mainGoalListMockData from "../mocks/mainGoalList";
import GoalTile from "../components/GoalTile";
import MainGoalList from "../components/MainGoalList";
import CustomDropdown from "../components/CustomDropdown";

export default function MyArtListPage() {
    const [currentData] = useState(mainGoalListMockData[0]); // 첫 번째 데이터 사용
    const [selectedState, setSelectedState] = useState("all"); // 필터링할 상태값
    const navigate = useNavigate();

    // 상태 필터링 로직
    const filteredGoals = selectedState === "all"
        ? currentData.mainGoals
        : selectedState === "active"
            ? currentData.mainGoals.filter(goal => goal.state === "active" || goal.state === "rep") // 활성화 선택 시 대표 포함
            : currentData.mainGoals.filter(goal => goal.state === selectedState);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">

            <LogoHeader />

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 w-full">
                <MottoCard motto={currentData.comment} />

                {filteredGoals.length > 0 ? (
                    <div>
                        {/* 커스텀 필터 드롭다운 */}
                        <div className="mt-4 w-full flex justify-end">
                            <CustomDropdown
                                selectedState={selectedState}
                                setSelectedState={setSelectedState}
                            />
                        </div>

                        <div className="mt-3 p-3 overflow-y-auto max-h-[calc(100vh-100px)]">
                            <ul className="space-y-3">
                                {filteredGoals.map((goal) => (
                                    <li key={goal.id}>
                                        <MainGoalList name={goal.name} state={goal.state} />
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* 마이라트 생성하기 버튼 */}
                        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 max-w-[480px] w-full px-6 z-20">
                            <button
                                className="w-full bg-customMain text-white py-3 rounded-md shadow-lg text-sm font-bold"
                                onClick={() => navigate('/createmyart')}
                            >
                                마이라트 생성하기
                            </button>
                        </div>

                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        {/* 목표 생성 버튼 및 빈 타일 */}
                        <div className="w-5/6 h-auto grid grid-cols-3 gap-3 justify-items-center items-center p-2 my-3">
                            <GoalTile type="empty" />
                            <GoalTile type="empty" />
                            <GoalTile type="empty" />
                            <GoalTile type="empty" />
                            <button className="w-full" onClick={() => navigate('/createmyart')}>
                                <div
                                    className={`w-full aspect-[1/1] bg-customMain rounded-xl flex items-center justify-center text-white font-medium text-sm p-2 
                                    shadow-[0_4px_6px_rgba(0,0,0,0.05),0_-4px_6px_rgba(0,0,0,0.05)]`}
                                >
                                    <span
                                        className="line-clamp-3 text-center overflow-hidden text-ellipsis whitespace-normal leading-tight break-words"
                                    >
                                        마이라트 <br /> 생성
                                    </span>
                                </div>
                            </button>
                            <GoalTile type="empty" />
                            <GoalTile type="empty" />
                            <GoalTile type="empty" />
                            <GoalTile type="empty" />
                        </div>

                        {/*설명 텍스트 */}
                        <div className="text-center mt-6">
                            <p className="text-customTextBlack font-semibold text-xs mb-1">현재 진행중인 마이라트가 없어요</p>
                            <p className="text-customTextBlack font-semibold text-xs mb-1">
                                <span className="text-customMain font-bold text-xs">마이라트 생성 버튼</span>을 클릭하여
                            </p>
                            <p className="text-customTextBlack font-semibold text-xs">나만의 만다라트를 만들어보세요!</p>
                        </div>
                    </div>
                )}
            </div>

            {/* 네비게이션바 */}
            <Navbar initialActiveNav={2} />
        </div>
    );
}
