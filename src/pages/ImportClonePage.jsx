import React, { useState } from "react";
import Header from "../components/Header";
import mainGoalListMockData from "../mocks/mainGoalList";
import CloneMainGoalList from "../components/CloneMainGoalList";
import { useLocation, useNavigate } from "react-router-dom";

export default function ImportClonePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { type } = location.state || {}; // type을 여기서 꺼냄

    const [currentData] = useState(mainGoalListMockData[0]);
    const [activeId, setActiveId] = useState(null);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-70 px-6 pt-24">
            <Header title="가져오기" />
            <div className="mb-6 w-full ">
                <div className="p-2 overflow-y-auto max-h-[calc(100vh-180px)]">
                    <div className="space-y-3">
                        {currentData.mainGoals.map((goal) => (
                            <CloneMainGoalList
                                key={goal.id}
                                id={goal.id}
                                type={type}
                                name={goal.name}
                                activeId={activeId}
                                setActiveId={setActiveId}
                            />
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 max-w-[480px] w-full px-6 z-20">
                    <button
                        className="w-full bg-customMain text-white py-3 rounded-md shadow-lg text-sm font-bold"
                        onClick={goBack}
                    >
                        가져오기
                    </button>
                </div>
            </div>
        </div>
    );
}
