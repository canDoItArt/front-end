import { useState } from "react";
import { useLocation, useParams  } from "react-router-dom";
import Header from "../components/Header";
import DailyActionTiles from "../components/DailyActionTiles";
import subGoalMockData from "../mocks/subGoal";
import DailyActionList from "../components/DailyActionList";
import DailyActionCalendar from "../components/DailyActionCalendar";

export default function SubGoalPage() {
    const location = useLocation();
    const { mainGoalId } = useParams();
    const importedGoal = location.state?.importedGoal; // 전달받은 daily action
    const [currentData] = useState(subGoalMockData[0]); // 첫 번째 데이터 사용

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">

            <Header title={currentData.subGoalName} page="SubGoalPage" achievement={currentData.is_achieved} mainGoalId={mainGoalId}/>

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-6 w-full">
                <DailyActionTiles title={currentData.subGoalName} dailyActions={currentData.dailyActions} color={currentData.color} importedGoal={importedGoal} />

                <div className="mt-6 p-2 ">
                    <h3 className="text-base font-bold text-customTextBlack mb-4">Daily Action 캘린더</h3>
                    <DailyActionCalendar subGoals={currentData} />
                </div>

                <div className="mt-6 p-2 ">
                    <h3 className="text-base font-bold text-customTextBlack mb-4">Daily Action 목록</h3>
                    {currentData.dailyActions.map((action) => (
                        <DailyActionList
                            key={action.id} // <- resetKey를 key에 포함하여 상태 초기화
                            title={action.title}
                            content={action.content}
                            routine={action.routine}
                            achievement={action.is_achieved}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}