import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import MottoCard from "../components/MottoCard";
//import myArtMockData from "../mocks/myArt";
import SubGoalTiles from "../components/SubGoalTiles";
import SubGoalCalendar from "../components/SubGoalCalendar";
import { format, startOfWeek } from "date-fns";
import api from "../api/axiosInstance";
import { useAuth } from "../contexts/AuthContext";

export default function MyArtPage() {
    const location = useLocation();
    const importedGoal = location.state?.importedGoal; // 가져온 subgoal
    const [currentData, setCurrentData] = useState(null); // 첫 번째 데이터 사용
    const { mainGoalId } = useParams();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date();
        const monday = startOfWeek(today, { weekStartsOn: 1 });
        return format(monday, "yyyy-MM-dd");
    });

    // ✅ API 호출
    useEffect(() => {
        const fetchMainGoal = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/api/main-goals/${mainGoalId}`);
                if (res.data.code === "200") {
                    setCurrentData(res.data.data);
                } else {
                    setError("데이터를 불러오는 데 실패했습니다.");
                }
            } catch (err) {
                console.error("메인골 상세 조회 실패:", err);
                setError("오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (mainGoalId) {
            fetchMainGoal();
        }
    }, [mainGoalId]);
    
    // ✅ SubGoalCalendar에서 호출할 핸들러
    const handleChangeWeekStart = (formatted, newProgressData) => {
        setCurrentWeekStart(formatted);

        // currentData 갱신
        setCurrentData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                progress: {
                    ...prev.progress,
                    startDate: newProgressData.start_date,
                    endDate: newProgressData.end_date,
                    weekOfMonth: newProgressData.week_of_month,
                    subProgress: newProgressData.progress,
                },
            };
        });
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    if (!currentData) {
        return null; // 데이터가 없을 경우 안전 처리
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">

            <Header title={currentData.mainGoal.name} page="MyArtPage" state={currentData.mainGoal.status} />

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-6 w-full">
                <MottoCard motto={user?.comment} />

                <SubGoalTiles
                    title={currentData.mainGoal.name}
                    subGoals={currentData.subGoals}
                    importedGoal={importedGoal}
                    mainGoalId={mainGoalId}
                />

                <SubGoalCalendar
                    mainGoalId={mainGoalId}
                    subGoals={currentData.subGoals}
                    progress={currentData.progress.subProgress}
                    start_date={currentData.progress.startDate}
                    end_date={currentData.progress.endDate}
                    week_of_month={currentData.progress.weekOfMonth}
                    currentWeekStart={currentWeekStart}
                    onChangeWeekStart={handleChangeWeekStart}
                />
            </div>
        </div>
    );
}