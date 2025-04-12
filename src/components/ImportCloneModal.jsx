import ModalLayout from "./ModalLayout";
import mainGoalListMockData from "../mocks/mainGoalList";
import React, { useState } from "react";
import CloneMainGoalList from "./CloneMainGoalList";

export default function ImportCloneModal({ isOpen, onClose, type }) {
    if (!isOpen) return null;

    const [currentData] = useState(mainGoalListMockData[0]); // 첫 번째 데이터 사용
    const [activeId, setActiveId] = useState(null); // 현재 활성화된 ID 저장

    return (
        <ModalLayout onClose={onClose}>
            <h2 className="text-sm font-bold mb-4 text-center">가져오기</h2>

            {/* mainGoals 리스트 출력 */}
            <div className="mt-3 p-2 overflow-y-auto max-h-[calc(100vh-310px)]">
                <div className="space-y-3">
                    {currentData.mainGoals.map((goal) => (
                        <CloneMainGoalList
                            key={goal.id}
                            id={goal.id}
                            name={goal.name}
                            activeId={activeId}
                            setActiveId={setActiveId}
                        />
                    ))}
                </div>
            </div>

            {/* 버튼 그룹 */}
            <div className="mt-6 flex justify-center space-x-4">
                <button
                    className="p-2 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
                    onClick={onClose}
                >
                    취소
                </button>
                <button
                    className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                    onClick={onClose}
                >
                    생성하기
                </button>
            </div>
        </ModalLayout>
    );
}
