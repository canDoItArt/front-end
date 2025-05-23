import { useState } from "react";
import Header from "../components/Header";
import cloneListMockData from "../mocks/cloneList";
import CloneMainGoalList from "../components/CloneMainGoalList";
import { useLocation, useNavigate } from "react-router-dom";

export default function ImportClonePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { type } = location.state || {};

    const [currentData] = useState(cloneListMockData[0]);
    const [activeId, setActiveId] = useState(null);
    const [selectedSubGoal, setSelectedSubGoal] = useState(null);
    const [selectedDailyAction, setSelectedDailyAction] = useState(null);


    const handleImport = () => {
        const selectedGoal = currentData.mainGoals.find(goal => goal.id === activeId);
        if (!selectedGoal) return;

        if (type === "maingoal") {
            navigate("/createmyart", { state: { importedGoal: selectedGoal } });
        } else if (type === "subgoal") {
            if (!selectedSubGoal) return; // 서브 골이 선택되지 않은 경우
            navigate("/myart", { state: { importedGoal: selectedSubGoal } });
        } else if (type === "dailyaction") {
            if (!selectedDailyAction) return;
            navigate("/subgoal", { state: { importedGoal: selectedDailyAction } });
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-70 px-6 pt-24">
            <Header title="가져오기" />
            <div className="mb-6 w-full">
                <div className="p-2 overflow-y-auto max-h-[calc(100vh-180px)]">
                    <div className="space-y-3">
                        {currentData.mainGoals.map((goal) => (
                            <CloneMainGoalList
                                key={goal.id}
                                id={goal.id}
                                type={type}
                                name={goal.name}
                                subgoal={goal.subGoals}
                                activeId={activeId}
                                setActiveId={setActiveId}
                                onSubGoalSelect={setSelectedSubGoal} // 선택된 서브골
                                onDailyActionSelect={setSelectedDailyAction} // 선택된 데일리액션
                            />
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 max-w-[480px] w-full px-6 z-20">
                    <button
                        className={`w-full py-3 rounded-md shadow-customShadow text-sm font-bold 
                            ${(type === "subgoal" ? selectedSubGoal : activeId) ? 'bg-customMain text-white' : 'bg-gray-200 text-customTextGray cursor-not-allowed'}`}
                        onClick={handleImport}
                        disabled={type === "subgoal" ? !selectedSubGoal : !activeId}
                    >
                        가져오기
                    </button>
                </div>
            </div>
        </div>
    );
}
