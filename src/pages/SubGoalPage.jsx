import React, { useState } from "react";
import Header from "../components/Header";
import DailyActionTiles from "../components/DailyActionTiles";
import subGoalMockData from "../mocks/subGoal";
import DailyActionList from "../components/DailyActionList";

export default function SubGoalPage() {
    const [currentData] = useState(subGoalMockData[0]); // 첫 번째 데이터 사용

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">

            <Header title={currentData.subGoalName} page={"SubGoalPage"} state={currentData.dailyActions.state} />

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-6 w-full">
                <DailyActionTiles title={currentData.subGoalName} dailyActions={currentData.dailyActions} color={currentData.color} />
                <div className="p-2 overflow-y-auto max-h-[calc(100vh-445px)]">
                    {currentData.dailyActions.map((action) => (
                        <DailyActionList
                            key={action.id} // <- resetKey를 key에 포함하여 상태 초기화
                            title={action.title}
                            content={action.content}
                            routine={action.routine}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}