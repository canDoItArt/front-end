import subGoalMockData from "../mocks/subGoal";
import React, { useState } from "react";
import Input from "./Input";

export default function SubGoalRenameSubmodal({ closeSubModal, state }) {
    const [currentData] = useState(subGoalMockData[0]); // 첫 번째 데이터 사용
    const [title, setTitle] = useState(currentData.subGoalName);

    return (
        <div className="px-6 pb-6 text-center">
            {/* 이름 수정 */}
            <div className="text-left">
                <Input
                    id="title"
                    type="text"
                    label={"SubGoal 이름수정"}
                    value={title} // 상태 값 반영
                    onChange={(e) => setTitle(e.target.value)} // 입력 변경 반영
                    placeholder="SubGoal의 이름을 입력하세요"
                    required={false}
                />
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
                    onClick={closeSubModal}
                >
                    저장
                </button>
            </div>
        </div>
    );
}