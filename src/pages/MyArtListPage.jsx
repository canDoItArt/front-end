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
    const [currentData] = useState(mainGoalListMockData[0]); // 첫 번째 사용자 데이터
    const [mainGoals, setMainGoals] = useState(currentData.mainGoals); // state 관리
    const [selectedState, setSelectedState] = useState("all");
    const navigate = useNavigate();

    // 대표 마이라트 설정 함수
    const handleSetRep = (goalIdOrNull) => {
        setMainGoals(prevGoals =>
            prevGoals.map(goal => {
                // 해제 요청인 경우
                if (goalIdOrNull === null) {
                    if (goal.state === "rep") return { ...goal, state: "active" };
                    return goal;
                }

                // 대표 마이라트 설정
                if (goal.id === goalIdOrNull) return { ...goal, state: "rep" };
                if (goal.state === "rep") return { ...goal, state: "active" }; // 기존 rep는 해제
                return goal;
            })
        );
    };


    // 필터링
    const filteredGoals = selectedState === "all"
        ? mainGoals
        : selectedState === "active"
            ? mainGoals.filter(goal => goal.state === "active" || goal.state === "rep")
            : mainGoals.filter(goal => goal.state === selectedState);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
            <LogoHeader />

            <div className="mt-20 w-full">
                <MottoCard motto={currentData.comment} />

                {filteredGoals.length > 0 ? (
                    <>
                        <div className="mt-4 w-full flex justify-end">
                            <CustomDropdown
                                selectedState={selectedState}
                                setSelectedState={setSelectedState}
                            />
                        </div>

                        <div className="mt-3 p-3 overflow-y-auto max-h-[calc(100vh-320px)]">
                            <ul className="space-y-3">
                                {filteredGoals.map((goal) => (
                                    <li key={goal.id}>
                                        <MainGoalList
                                            key={goal.id}
                                            name={goal.name}
                                            state={goal.state}
                                            onSetRep={(isRemove) => handleSetRep(isRemove ? null : goal.id)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 max-w-[480px] w-full px-6">
                            <button
                                className="w-full bg-customMain text-white py-3 rounded-md shadow-lg text-sm font-bold"
                                onClick={() => navigate('/createmyart')}
                            >
                                마이라트 생성하기
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        {/* 빈 타일 + 생성 버튼 */}
                        <div className="w-5/6 h-auto grid grid-cols-3 gap-3 justify-items-center items-center p-2 my-3">
                            {[...Array(8)].map((_, idx) => (
                                idx === 4 ? (
                                    <button key={idx} className="w-full" onClick={() => navigate('/createmyart')}>
                                        <div className="w-full aspect-[1/1] bg-customMain rounded-xl flex items-center justify-center text-white font-medium text-sm p-2 shadow-md">
                                            <span className="line-clamp-3 text-center overflow-hidden whitespace-normal">
                                                마이라트 <br /> 생성
                                            </span>
                                        </div>
                                    </button>
                                ) : (
                                    <GoalTile key={idx} type="empty" />
                                )
                            ))}
                        </div>
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

            <Navbar initialActiveNav={2} />
        </div>
    );
}
