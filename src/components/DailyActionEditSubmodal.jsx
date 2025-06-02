import React, { useState } from "react";
import Input from "./Input";
import dailyActionMockData from "../mocks/dailyAction";
import { BsFillPlusCircleFill, BsDashCircleFill } from "react-icons/bs";

export default function DailyActionEditSubmodal({ closeSubModal, state }) {
    const [currentData] = useState(dailyActionMockData[0]); // 첫 번째 데이터 사용
    const [title, setTitle] = useState(currentData.daily_action_title);
    const [content, setContent] = useState(currentData.daily_action_content);
    const [routine, setRoutine] = useState(currentData.routine);
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");

    const handleSave = () => {
        let hasError = false;

        if (title.trim() === "") {
            setTitleError("제목 값은 필수 값입니다.");
            hasError = true;
        } else {
            setTitleError("");
        }

        if (content.trim() === "") {
            setContentError("내용 값은 필수 값입니다.");
            hasError = true;
        } else {
            setContentError("");
        }

        if (hasError) return;

        // 저장 로직 추가 가능
        closeAddModal();
    };

    return (
        <div className="px-6 pb-6 text-center">
            {/* 제목 수정 */}
            <div className="text-left">
                <Input
                    id="title"
                    type="text"
                    label={"Daily Action 제목"}
                    value={title} // 상태 값 반영
                    onChange={(e) => setTitle(e.target.value)} // 입력 변경 반영
                    placeholder="Daily Action 제목을 입력하세요"
                    required={true}
                    error={titleError}
                />
            </div>

            {/* 데일리 액션 내용 수정 */}
            <div className="text-left">
                <Input
                    id="title"
                    type="text"
                    label={"Daily Action을 입력해주세요"}
                    value={content} // 상태 값 반영
                    onChange={(e) => setContent(e.target.value)} // 입력 변경 반영
                    placeholder="Daily Action 내용을 입력하세요"
                    required={true}
                    error={contentError}
                />
            </div>

            {/* 루틴 수정 */}
            <div className="flex justify-between mt-6 text-left">
                <label className="block text-sm font-medium text-customTextBlack">
                    일주일 목표 진행 횟수<span className="text-red-500">*</span>
                </label>
                <div className="flex justify-between items-center gap-4">
                    {/* 마이너스 버튼 */}
                    <button
                        type="button"
                        onClick={() => setRoutine(prev => Math.max(prev - 1, 1))}
                        disabled={routine === 1}
                    >
                        <BsDashCircleFill
                            className={`text-2xl ${routine === 1 ? "text-gray-300" : "text-customMain"
                                }`}
                        />
                    </button>

                    {/* 현재 routine 값 표시 */}
                    <span className="text-base font-medium">{routine}</span>

                    {/* 플러스 버튼 */}
                    <button
                        type="button"
                        onClick={() => setRoutine(prev => Math.min(prev + 1, 7))}
                        disabled={routine === 7}
                    >
                        <BsFillPlusCircleFill
                            className={`text-2xl ${routine === 7 ? "text-gray-300" : "text-customMain"
                                }`}
                        />
                    </button>
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