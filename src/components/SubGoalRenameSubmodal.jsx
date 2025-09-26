import subGoalMockData from "../mocks/subGoal";
import { useState } from "react";
import Input from "./Input";
import api from "../api/axiosInstance";

export default function SubGoalRenameSubmodal({ closeSubModal, title: initialTitle, state, subGoalId, onUpdateSubGoal }) {
    const [title, setTitle] = useState(initialTitle || "");
    const [titleError, setTitleError] = useState(""); // 에러 상태 추가
    const [attainment, setAttainment] = useState(state); // ✅ 달성여부 상태

    const handleSave = async () => {
        if (title.trim() === "") {
            setTitleError("이름 값은 필수 값입니다.");
            return;
        }

        setTitleError("");

        try {
            const response = await api.patch(`/api/sub-goals/${subGoalId}`, {
                name: title,
                attainment: attainment,
            });

            console.log("서브골 수정 성공:", response.data);
            
            // ✅ 부모 상태 갱신
            if (onUpdateSubGoal) {
                onUpdateSubGoal(response.data.data);
            }

            closeSubModal(); // 성공 시 모달 닫기
        } catch (error) {
            console.error("서브골 수정 실패:", error);
            alert("서브골 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const toggleAttainment = () => {
        setAttainment((prev) => !prev);
    };

    return (
        <div className="p-6 text-center">
            <h2 className="text-base font-bold mb-7">Sub Goal 수정</h2>

            {/* 이름 수정 */}
            <div className="text-left">
                <Input
                    id="title"
                    type="text"
                    label={"SubGoal 이름"}
                    value={title} // 상태 값 반영
                    onChange={(e) => setTitle(e.target.value)} // 입력 변경 반영
                    placeholder="SubGoal의 이름을 입력하세요"
                    required={true}
                    error={titleError}
                />
            </div>

            {/* 슬라이드 스위치 */}
            <div className="flex items-center justify-between mb-10">
                <label className="block text-sm font-medium text-customTextBlack">
                    달성여부
                </label>

                {/* 슬라이드 스위치 */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleAttainment}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${attainment ? "bg-customMain" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${attainment ? "translate-x-6" : "translate-x-1"
                                }`}
                        />
                    </button>
                    <p className="text-center mt-1 w-10 text-sm text-gray-600">
                        {attainment ? "달성" : "미달성"}
                    </p>
                </div>

            </div>

            {/* 버튼 그룹 */}
            <div className="mt-6 flex justify-center space-x-4">
                <button
                    className="p-2 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
                    onClick={closeSubModal}
                >
                    취소
                </button>
                <button
                    className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                    onClick={handleSave}
                >
                    저장
                </button>
            </div>
        </div>
    );
}