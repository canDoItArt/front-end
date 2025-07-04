import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hexToColorClass from "../constants/colorMappings";
import GoalTile from "./GoalTile";
import BottomModalLayout from "./BottomModalLayout";
import Input from "./Input";

export default function SubGoalTiles({ title, subGoals, importedGoal }) {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [titleError, setTitleError] = useState(""); // 에러 상태 추가

    useEffect(() => {
        if (importedGoal) {
            setInputValue(importedGoal.name); // 가져온 이름을 input 초기값으로 설정
            setShowAddModal(true); // 자동으로 모달 열기
        }
    }, [importedGoal]);

    const handleSave = () => {
        if (inputValue.trim() === "") {
            setTitleError("Sub Goal 제목 값은 필수 값입니다.");
            return;
        }

        setTitleError(""); // 에러 초기화
        // 저장 로직 실행 가능
        closeAddModal(); // 저장 성공 시 모달 닫기
    };

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const subGoalTileClick = () => {
        navigate('/subgoal');
    };

    const addTileClick = () => {
        setShowAddModal(true);
    };

    // 모달 닫기 + 입력값 초기화
    const closeAddModal = () => {
        setShowAddModal(false);
        setInputValue(""); // 입력값 초기화
        setTitleError(""); // 에러 초기화
    };

    const cloneButtonClick = () => {
        setShowAddModal(false);
        setTimeout(() => {
            navigate('/importclone', { state: { type: 'subgoal' } });
        }, 300);
    };

    const idLayout = [
        ["#EB4335", "#F09752", "#F7D04D"], // Red, Orange, Yellow
        ["#8B80DD", "t", "#B1D854"],       // Purple, title, Green
        ["#4091EE", "#7BBFF9", "#70CCB1"]  // Blue, Sky, Mint
    ];

    return (
        <div className="flex justify-center">
            <div className="w-4/5 h-auto grid grid-cols-3 gap-3 justify-items-center items-center my-5">
                {idLayout.flat().map((id, index) => {
                    if (id === "t") {
                        return <GoalTile key={`title-${index}`} text={title} type="title" />;
                    }

                    const goal = subGoals.find((goal) => goal.color === id);
                    if (goal) {
                        if (goal.is_attained === true) {
                            return (
                                <button
                                    key={`goal-${goal.id}`}
                                    className="w-full"
                                    onClick={subGoalTileClick}
                                >
                                    <GoalTile
                                        text={goal.name}
                                        color={hexToColorClass[goal.color]}
                                        type="achievement"
                                        goal="subGoal"
                                    />
                                </button>
                            );
                        };
                        return (
                            <button
                                key={`goal-${goal.id}`}
                                className="w-full"
                                onClick={subGoalTileClick}
                            >
                                <GoalTile
                                    text={goal.name}
                                    color={hexToColorClass[goal.color]}
                                />
                            </button>
                        );
                    }

                    return (
                        <button
                            key={`add-${index}`}
                            className="w-full"
                            onClick={addTileClick}
                        >
                            <GoalTile type="add" />
                        </button>
                    );
                })}
            </div>

            <BottomModalLayout isOpen={showAddModal} onClose={closeAddModal} >
                <div className="p-6 text-right">
                    <div className="flex justify-between">
                        <h2 className="text-base font-bold mb-4 text-center">SubGoal 생성</h2>
                        <button
                            className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                            onClick={cloneButtonClick}
                        >
                            가져오기
                        </button>
                    </div>

                    {/* Sub Goal 생성 */}
                    <div className="text-left">
                        <Input
                            id="title"
                            type="text"
                            label={"Sub Goal 제목"}
                            placeholder="생성할 Sub Goal명을 입력해주세요"
                            required={true}
                            value={inputValue}
                            onChange={handleInputChange}
                            error={titleError}
                        />
                    </div>

                    {/* 버튼 그룹 */}
                    <div className="mt-6 flex justify-center space-x-4">
                        <button
                            className="p-2 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
                            onClick={closeAddModal}
                        >
                            취소
                        </button>
                        <button
                            className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                            onClick={handleSave}
                        >
                            생성
                        </button>
                    </div>
                </div>
            </BottomModalLayout>
        </div>
    );
}
