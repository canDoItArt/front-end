import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import hexToColorClass from "../constants/colorMappings";

export default function CreateMyArtPage() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const [subGoalInput, setSubGoalInput] = useState("");
    const [subGoals, setSubGoals] = useState([]);

    const handleAddSubGoal = () => {
        if (subGoalInput.trim() === "" || subGoals.length >= 8) return; // ✅ 최대 8개 제한
        setSubGoals([...subGoals, subGoalInput.trim()]);
        setSubGoalInput("");
    };

    const cloneButtonClick = () => {
        navigate('/importclone', { state: { type: 'maingoal' } });
    };

    const handleDeleteSubGoal = (index) => {
        const newGoals = subGoals.filter((_, i) => i !== index);
        setSubGoals(newGoals);
    };

    const colorClasses = Object.values(hexToColorClass);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6 pt-20">
            <Header title="마이라트 생성하기" />

            <div className="mb-6 w-full">
                <div className="flex justify-end mb-2">
                    <button
                        onClick={cloneButtonClick}
                        className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                    >
                        가져오기
                    </button>
                </div>

                <div className="text-left">
                    <Input
                        type="text"
                        label={"Main Goal 입력"}
                        placeholder="Main Goal을 입력해주세요"
                        required={true}
                    />

                    <Input
                        type="text"
                        label={"Sub Goal 추가"}
                        placeholder="Sub Goal을 추가해주세요"
                        value={subGoalInput}
                        onChange={(e) => setSubGoalInput(e.target.value)}
                        required={false}
                    >
                        <button
                            type="button"
                            onClick={handleAddSubGoal}
                            className="ml-2 w-16 h-10 text-xs font-normal bg-customMain text-white rounded-md"
                        >
                            추가
                        </button>
                    </Input>

                    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-460px)]">
                        {subGoals.map((goal, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center bg-opacity-15 px-4 py-3 rounded-md ${colorClasses[index % colorClasses.length]
                                    }`}
                            >
                                <span className="text-sm text-gray-800">{goal}</span>
                                <button
                                    onClick={() => handleDeleteSubGoal(index)}
                                    className="text-red-500 text-xl font-medium"
                                >
                                    ⊖
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* ✅ Sub Goal 최대 8개 메시지 (선택사항) */}
                    {subGoals.length >= 8 && (
                        <p className="text-xs text-red-400 mt-2">
                            Sub Goal은 최대 8개까지 추가할 수 있어요.
                        </p>
                    )}
                </div>

                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 max-w-[480px] w-full px-6 z-20">
                    <button
                        className="w-full bg-customMain text-white py-3 rounded-md shadow-lg text-sm font-bold"
                        onClick={goBack}
                    >
                        마이라트 생성하기
                    </button>
                </div>
            </div>
        </div>
    );
}
