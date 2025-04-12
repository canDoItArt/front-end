import React, { useState } from "react";
import Header from "../components/Header";
import MottoCard from "../components/MottoCard";
import myArtMockData from "../mocks/myArt";
import SubGoalTiles from "../components/SubGoalTiles";
import SubGoalCalendar from "../components/SubGoalCalendar";

export default function MyArtPage() {
    const [currentData] = useState(myArtMockData[0]); // 첫 번째 데이터 사용

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">

            <Header title={currentData.mainGoals.name} page={"MyArtPage"} state={currentData.mainGoals.state}/>

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-6 w-full">
                <MottoCard motto={currentData.comment} />

                <SubGoalTiles title={currentData.mainGoals.name} subGoals={currentData.subGoals}/>

                <SubGoalCalendar subGoals={currentData.subGoals} />
            </div>
            
        </div>
    );
}