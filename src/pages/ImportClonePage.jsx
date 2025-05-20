import { useState } from "react";
import Header from "../components/Header";
import cloneListMockData from "../mocks/cloneList";
import CloneMainGoalList from "../components/CloneMainGoalList";
import { useLocation, useNavigate } from "react-router-dom";

export default function ImportClonePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { type } = location.state || {}; // type을 여기서 꺼냄

    const [currentData] = useState(cloneListMockData[0]);
    const [activeId, setActiveId] = useState(null);

    const handleImport = () => {
        const selectedGoal = currentData.mainGoals.find(goal => goal.id === activeId);
        if (!selectedGoal) return;

        if (type === "maingoal") {
            navigate("/createmyart", { state: { importedGoal: selectedGoal } });
        } else if (type === "subgoal") {
            navigate("/myart", { state: { importedGoal: selectedGoal } });
        } else if (type === "dailyaction") {
            navigate("/subgoal", { state: { importedGoal: selectedGoal } });
        } else {
            navigate(-1); // 혹시 type이 없거나 잘못된 경우 안전하게 이전 페이지로
        }
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
                                subgoal={goal.subGoals}
                                activeId={activeId}
                                setActiveId={setActiveId}
                            />
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 max-w-[480px] w-full px-6 z-20">
                    <button
                        className={`w-full py-3 rounded-md shadow-customShadow text-sm font-bold 
                            ${activeId ? 'bg-customMain text-white' : 'bg-gray-200 text-customTextGray cursor-not-allowed'}`}
                        onClick={handleImport}
                        disabled={!activeId}
                    >
                        가져오기
                    </button>

                </div>
            </div>
        </div>
    );
}
