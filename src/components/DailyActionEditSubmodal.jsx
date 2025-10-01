import { useState } from "react";
import Input from "./Input";
import { BsFillPlusCircleFill, BsDashCircleFill } from "react-icons/bs";
import api from "../api/axiosInstance";

export default function DailyActionEditSubmodal({
    id,
    title: initialTitle,
    targetNum: initialTargetNum,
    content: initialContent,
    attainment: initialAttainment,
    closeSubModal,
    onUpdate
}) {
    //const [currentData] = useState(dailyActionMockData[0]); // 첫 번째 데이터 사용
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [targetNum, setTargetNum] = useState(initialTargetNum);
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [attainment, setAttainment] = useState(initialAttainment); // ✅ 달성여부 상태

    const handleSave = async () => {
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

        try {
            // ✅ PATCH API 호출
            const response = await api.patch(`/api/daily-actions/${id}`, {
                title,
                content,
                targetNum,
                attainment,
            });

            console.log("데일리 액션 수정 성공:", response.data);

            if (onUpdate) {
                onUpdate(response.data.data);
            }

            closeSubModal(); // 성공 시 모달 닫기
        } catch (error) {
            console.error("데일리 액션 수정 실패:", error);
            alert("데일리 액션 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const toggleAttainment = () => {
        setAttainment((prev) => !prev);
    };

    return (
        <div className="p-6 text-center">
            <h2 className="text-base font-bold mb-7">Daily Action 수정</h2>

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
            <div className="flex justify-between mt-6 mb-10 text-left">
                <label className="block text-sm font-medium text-customTextBlack">
                    일주일 목표 진행 횟수<span className="text-red-500">*</span>
                </label>
                <div className="flex justify-between items-center gap-4">
                    {/* 마이너스 버튼 */}
                    <button
                        type="button"
                        onClick={() => setTargetNum(prev => Math.max(prev - 1, 1))}
                        disabled={targetNum === 1}
                    >
                        <BsDashCircleFill
                            className={`text-2xl ${targetNum === 1 ? "text-gray-300" : "text-customMain"
                                }`}
                        />
                    </button>

                    {/* 현재 routine 값 표시 */}
                    <span className="text-base font-medium">{targetNum}</span>

                    {/* 플러스 버튼 */}
                    <button
                        type="button"
                        onClick={() => setTargetNum(prev => Math.min(prev + 1, 7))}
                        disabled={targetNum === 7}
                    >
                        <BsFillPlusCircleFill
                            className={`text-2xl ${targetNum === 7 ? "text-gray-300" : "text-customMain"
                                }`}
                        />
                    </button>
                </div>
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