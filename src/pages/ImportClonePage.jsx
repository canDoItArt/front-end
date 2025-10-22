import { useState, useEffect } from "react";
import Header from "../components/Header";
import cloneListMockData from "../mocks/cloneList";
import CloneMainGoalList from "../components/CloneMainGoalList";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function ImportClonePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { type, mainGoalId, subGoalId, selectedSlotNum } = location.state || {};

    //const [currentData] = useState(cloneListMockData[0]);
    const [currentData, setCurrentData] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const [selectedSubGoal, setSelectedSubGoal] = useState(null);
    const [selectedDailyAction, setSelectedDailyAction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [importing, setImporting] = useState(false);


    useEffect(() => {
        const fetchMainGoals = async () => {
            try {
                const response = await api.get("/api/mandalart/main-goals");
                const mainGoals = response.data?.mainGoals || [];
                setCurrentData({ mainGoals });
            } catch (error) {
                console.error("메인 목표 데이터를 불러오는 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMainGoals();
    }, []);


    const handleImport = async () => {
        try {
            setImporting(true);

            if (type === "maingoal") {
                // 선택된 메인골 찾기
                const selectedGoal = currentData.mainGoals.find(goal => goal.id === activeId);
                if (!selectedGoal) return;

                console.log("✅ 선택된 메인골:", selectedGoal);
                console.log("📡 요청 URL:", `/api/mandalart/main-goals/${selectedGoal.id}`);


                // 1️⃣ 해당 메인골의 서브골 목록 불러오기
                const resMain = await api.get(`/api/mandalart/main-goals/${selectedGoal.id}`);
                console.log("📦 응답 데이터:", resMain.data);

                const { mainGoal, subGoals } = resMain.data;

                // 2️⃣ 각 서브골의 dailyActions 병렬로 요청
                const subGoalsWithDaily = await Promise.all(
                    subGoals.map(async (sub) => {
                        try {
                            const resSub = await api.get(`/api/mandalart/sub-goals/${sub.id}`);
                            return {
                                ...resSub.data.subGoal,
                                dailyActions: resSub.data.dailyActions || [],
                            };
                        } catch (error) {
                            // ✅ 404 에러일 경우 빈 dailyActions으로 처리
                            if (error.response && error.response.status === 404) {
                                console.warn(`⚠️ 서브골 ${sub.id}의 데일리액션이 없습니다. (404)`);
                                return {
                                    ...sub,
                                    dailyActions: [],
                                };
                            } else {
                                console.error(`🚨 서브골 ${sub.id} 요청 중 오류:`, error);
                                throw error; // 다른 에러는 다시 던져서 상위 catch로 전달
                            }
                        }
                    })
                );

                // 3️⃣ 메인골 + 서브골 + 데일리액션 합친 객체 구성
                const combinedGoal = {
                    ...mainGoal,
                    subGoals: subGoalsWithDaily,
                };

                navigate("/createmyart", { state: { importedGoal: combinedGoal } });

            } else if (type === "subgoal") {
                if (!selectedSubGoal) return;

                try {
                    // 1️⃣ 해당 subGoal의 dailyActions 가져오기
                    const res = await api.get(`/api/mandalart/sub-goals/${selectedSubGoal.id}`);
                    const { subGoal, dailyActions } = res.data;

                    const combinedSubGoal = {
                        ...subGoal,
                        dailyActions: dailyActions || [],
                    };

                    navigate(`/myart/${mainGoalId}`, { state: { importedGoal: combinedSubGoal, selectedSlotNum } });

                } catch (error) {
                    // ✅ 404 에러일 경우 빈 dailyActions으로 처리
                    if (error.response && error.response.status === 404) {
                        console.warn(`⚠️ 서브골 ${selectedSubGoal.id}의 데일리액션이 없습니다. (404)`);

                        const combinedSubGoal = {
                            ...selectedSubGoal,
                            dailyActions: [],
                        };

                        navigate(`/myart/${mainGoalId}`, { state: { importedGoal: combinedSubGoal, selectedSlotNum } });
                    } else {
                        console.error("🚨 서브골 요청 중 오류:", error);
                        throw error; // 다른 에러는 상위 catch로 전달
                    }
                }
            } else if (type === "dailyaction") {
                if (!selectedDailyAction) return;
                navigate(`/myart/${mainGoalId}/subgoal/${subGoalId}`, { state: { importedGoal: selectedDailyAction } });
            } else {
                navigate(-1);
            }
        } catch (error) {
            console.error("데이터 가져오기 중 오류 발생:", error);
            alert("데이터를 불러오는 중 문제가 발생했습니다.");
        } finally {
            setImporting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                데이터를 불러오는 중입니다...
            </div>
        );
    }

    if (!currentData || currentData.mainGoals.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                가져올 목표 데이터가 없습니다.
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-70 px-6 pt-24">
            <Header title="가져오기" />
            <div className="mb-6 w-full">
                <div className="p-2 overflow-y-auto max-h-[calc(100vh-180px)]">
                    <div className="space-y-3">
                        {currentData.mainGoals.map((goal) => (
                            <CloneMainGoalList
                                key={goal.id}
                                id={goal.id}
                                type={type}
                                name={goal.name}
                                activeId={activeId}
                                setActiveId={setActiveId}
                                onSubGoalSelect={setSelectedSubGoal} // 선택된 서브골
                                onDailyActionSelect={setSelectedDailyAction} // 선택된 데일리액션
                            />
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 max-w-[480px] w-full px-6 z-20">
                    <button
                        className={`w-full py-3 rounded-md shadow-customShadow text-sm font-bold 
                            ${(type === "subgoal" ? selectedSubGoal : activeId) ? 'bg-customMain text-white' : 'bg-gray-200 text-customTextGray cursor-not-allowed'}`}
                        onClick={handleImport}
                        disabled={type === "subgoal" ? !selectedSubGoal : !activeId}
                    >
                        {importing ? (
                            <div className="flex justify-center items-center gap-2">
                                <div className="animate-spin h-4 w-4 border-t-2 border-white rounded-full"></div>
                                가져오는 중...
                            </div>
                        ) : (
                            "가져오기"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
