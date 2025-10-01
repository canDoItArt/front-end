import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import DailyActionTiles from "../components/DailyActionTiles";
import DailyActionList from "../components/DailyActionList";
import DailyActionCalendar from "../components/DailyActionCalendar";
import api from "../api/axiosInstance";
import slotColors from "../constants/soltNumMappings";

export default function SubGoalPage() {
    const location = useLocation();
    const { mainGoalId, subGoalId } = useParams();
    const importedGoal = location.state?.importedGoal; // 전달받은 daily action

    const [currentData, setCurrentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubGoalData = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/sub-goals/${subGoalId}`, {
                    params: {
                        unit: "WEEK", // 필요 시 MONTH로 변경 가능
                    },
                });

                if (response.data && response.data.code === "200") {
                    setCurrentData(response.data.data);
                } else {
                    setError("데이터를 불러오는 데 실패했습니다.");
                }
            } catch (err) {
                console.error(err);
                setError("API 요청 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (subGoalId) {
            fetchSubGoalData();
        }
    }, [subGoalId]);

    if (loading) {
        return <div className="text-center mt-20">로딩 중...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">

            <Header
                title={currentData.subGoal.name}
                page="SubGoalPage"
                state={currentData.subGoal.attainment}
                mainGoalId={mainGoalId}
                subGoalId={subGoalId}
                onUpdateSubGoal={(updatedData) => {
                    setCurrentData((prev) => ({
                        ...prev,
                        subGoal: {
                            ...prev.subGoal,
                            name: updatedData.name,
                            attainment: updatedData.attainment,
                        },
                    }));
                }}
            />

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-6 w-full">
                <DailyActionTiles
                    id={currentData.dailyActions.id}
                    title={currentData.subGoal.name}
                    dailyActions={currentData.dailyActions}
                    color={slotColors[currentData.subGoal.slotNum]}
                    importedGoal={importedGoal}
                    subGoalId={subGoalId}
                    onDailyActionCreated={(newDailyAction) => {
                        // 새로 추가된 액션을 state에 반영
                        setCurrentData((prev) => ({
                            ...prev,
                            dailyActions: [...prev.dailyActions, newDailyAction],
                        }));
                    }}
                />

                <div className="mt-6 p-2 ">
                    {Array.isArray(currentData.dailyActions) && currentData.dailyActions.length > 0 ? (
                        <>
                            <h3 className="text-base font-bold text-customTextBlack mb-4">Daily Action 캘린더</h3>
                            {/* <DailyActionCalendar subGoalProgress={currentData.progress} /> */}
                        </>
                    ) : (
                        <div className="text-center text-base text-gray-400 py-10">
                            데일리액션이 존재하지 않습니다. <br />
                            데일리 액션을 생성해주세요.
                        </div>
                    )}
                </div>

                {Array.isArray(currentData.dailyActions) && currentData.dailyActions.length > 0 && (
                    <div className="mt-6 p-2 ">
                        <h3 className="text-base font-bold text-customTextBlack mb-4">Daily Action 목록</h3>
                        {currentData.dailyActions.map((action) => (
                            <DailyActionList
                                key={action.id} // <- resetKey를 key에 포함하여 상태 초기화
                                id={action.id}
                                title={action.title}
                                content={action.content}
                                targetNum={action.targetNum}
                                attainment={action.attainment}
                                onUpdate={(updatedAction) => {
                                    setCurrentData((prev) => ({
                                        ...prev,
                                        dailyActions: prev.dailyActions.map((a) =>
                                            a.id === updatedAction.id ? updatedAction : a
                                        ),
                                    }));
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}