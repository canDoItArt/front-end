import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import MottoCard from "../components/MottoCard";
import myArtMockData from "../mocks/myArt";
import SubGoalTiles from "../components/SubGoalTiles";
import SubGoalCalendar from "../components/SubGoalCalendar";
import { format, startOfWeek } from "date-fns";

export default function MyArtPage() {
    const location = useLocation();
    const importedGoal = location.state?.importedGoal; // 가져온 subgoal
    const [currentData] = useState(myArtMockData[0]); // 첫 번째 데이터 사용
    const { mainGoalId } = useParams();

    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date();
        const monday = startOfWeek(today, { weekStartsOn: 1 });
        return format(monday, "yyyy-MM-dd");
    });

    // useEffect(() => {
    //     
    // }, [currentWeekStart]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">

            <Header title={currentData.main_goal_name} page="MyArtPage" state={currentData.main_goal_status} />

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-6 w-full">
                <MottoCard motto={currentData.comment} />

                <SubGoalTiles title={currentData.main_goal_name} subGoals={currentData.sub_goals} importedGoal={importedGoal} mainGoalId={mainGoalId} />

                <SubGoalCalendar
                    subGoals={currentData.sub_goals}
                    start_date={currentData.start_date}
                    end_date={currentData.end_date}
                    week_of_month={currentData.week_of_month}
                    currentWeekStart={currentWeekStart}
                    onChangeWeekStart={setCurrentWeekStart}
                />
            </div>

        </div>
    );
}