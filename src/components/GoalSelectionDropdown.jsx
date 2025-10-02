import { useState } from "react";

export default function GoalSelectionDropdown({ goalName, onSelectGoal, goals }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleGoalSelect = (goal) => {
        onSelectGoal(goal);
        setIsModalOpen(false);
    };

    return (
        <div className="relative w-full text-center">
            <button
                onClick={toggleModal}
                className="flex items-center justify-center w-full p-3 text-sm font-bold bg-gray-100 rounded-lg text-customTextBlack"
            >
                {goalName}
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
                    onClick={toggleModal}
                >
                    <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 max-w-md">
                        <div className="items-center px-2">
                            <h2 className="text-base font-bold">Main Goal List</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto max-h-[60vh]">
                            <ul className="mt-4 space-y-2">
                                {goals.map((goal) => (
                                    <li key={goal.id}>
                                        <button
                                            onClick={() => handleGoalSelect(goal)}
                                            className="w-full px-5 py-3 text-left bg-gray-100 rounded-full text-sm font-medium"
                                        >
                                            {goal.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* 닫기 버튼 */}
                        <div className="mt-4 flex justify-center">
                            <button
                                className="w-auto bg-customMain text-white py-3 px-5 rounded-md shadow-lg text-xs font-semibold"
                                onClick={toggleModal}
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
