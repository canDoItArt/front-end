import { useState } from "react";
import hexToColorClass from "../constants/colorMappings";
import GoalTile from "./GoalTile";
import DailyActionModal from "./DailyActionModal"; // 모달 컴포넌트 이름 수정

export default function CheckList({ title, subGoals }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null); // 모달에 표시할 목표 정보 저장

    const idLayout = [
        ["#EB4335", "#F09752", "#F7D04D"], // Red, Orange, Yellow
        ["#8B80DD", "t", "#B1D854"],       // Purple, title, Green
        ["#4091EE", "#7BBFF9", "#70CCB1"]  // Blue, Sky, Mint
    ];

    // 모달을 닫는 함수
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGoal(null);
    };

    // 목표 클릭 시 모달을 열고 목표를 설정하는 함수
    const openModal = (goal) => {
        setSelectedGoal(goal);
        setIsModalOpen(true);
    };

    return (
        <div className="mt-6 w-full bg-white p-4 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.05),0_-4px_6px_rgba(0,0,0,0.05)]">
            <h3 className="text-base font-bold text-customTextBlack mb-4">이번주 한다! Check List</h3>
            <div className="flex justify-center">
                <div className="w-5/6 h-auto grid grid-cols-3 gap-3 justify-items-center items-center mb-4">
                    {idLayout.flat().map((id, index) => {
                        if (id === "t") {
                            return <GoalTile key={`title-${index}`} text={title} type="title" />;
                        }

                        const goal = subGoals.find((goal) => goal.color === id);
                        if (goal) {
                            return (
                                <button
                                    key={`goal-${goal.id}`}
                                    className="w-full"
                                    onClick={() => openModal(goal)} // 클릭 시 모달 열기
                                >
                                    <GoalTile
                                        text={goal.name}
                                        color={hexToColorClass[goal.color]}
                                    />
                                </button>
                            );
                        }

                        return <GoalTile key={`empty-${index}`} type="empty" />;
                    })}
                </div>
            </div>

            {/* DailyActionModal 컴포넌트 */}
            <DailyActionModal isOpen={isModalOpen} onClose={closeModal} goal={selectedGoal} />
        </div>
    );
}
