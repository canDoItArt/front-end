import subGoalMockData from "../mocks/subGoal";
import React, { useState } from "react";
import Input from "./Input";

export default function SubGoalRenameSubmodal({ closeSubModal }) {
    const [currentData] = useState(subGoalMockData[0]); // 첫 번째 데이터 사용
    const [title, setTitle] = useState(currentData.subGoalName);
    const [titleError, setTitleError] = useState(""); // 에러 상태 추가
    const [achieved, setAchieved] = useState(currentData.is_achieved); // ✅ 달성여부 상태

    const handleSave = () => {
        if (title.trim() === "") {
            setTitleError("이름 값은 필수 값입니다.");
            return; // 저장 로직 실행 안함
        }

        setTitleError(""); // 에러 초기화
        // 저장 로직 실행 가능
        closeSubModal(); // 저장 성공 시 모달 닫기
    };

    const toggleAchieved = () => {
        setAchieved((prev) => !prev);
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
                        onClick={toggleAchieved}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${achieved ? "bg-customMain" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${achieved ? "translate-x-6" : "translate-x-1"
                                }`}
                        />
                    </button>
                    <p className="text-center mt-1 w-10 text-sm text-gray-600">
                        {achieved ? "달성" : "미달성"}
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