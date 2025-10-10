import { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import dayjs from "dayjs";
import api from "../api/axiosInstance";

export default function DailyActionCalendar({ subGoalProgress, color, subGoalId }) {
    const [currentDate, setCurrentDate] = useState(subGoalProgress?.startDate ? new Date(subGoalProgress.startDate) : new Date());
    const [viewMode, setViewMode] = useState("week"); // 'week' 또는 'month' 모드
    const [dateColorMap, setDateColorMap] = useState({});
    const [dateRange, setDateRange] = useState({
        startDate: subGoalProgress?.startDate,
        endDate: subGoalProgress?.endDate,
    });

    useEffect(() => {
        if (subGoalProgress && Array.isArray(subGoalProgress.dailyProgress)) {
            const mappedColors = subGoalProgress.dailyProgress.reduce((acc, date) => {
                acc[date] = color || "bg-gray-200";
                return acc;
            }, {});
            setDateColorMap(mappedColors);
        }
    }, [subGoalProgress, color]);

    const fetchProgress = async (direction, newUnit = viewMode.toUpperCase()) => {
        try {
            const res = await api.get(`/api/sub-goals/${subGoalId}/daily-progress/calendar`, {
                params: {
                    date: dayjs(currentDate).format("YYYY-MM-DD"),
                    direction,
                    unit: newUnit,
                },
            });

            const { startDate, endDate, dailyProgress } = res.data.data;

            // ✅ 상태 갱신
            setCurrentDate(new Date(startDate));
            setDateRange({ startDate, endDate });
            setDateColorMap(
                dailyProgress.reduce((acc, date) => {
                    acc[date] = color || "bg-gray-200";
                    return acc;
                }, {})
            );
        } catch (err) {
            console.error("❌ 데일리 프로그레스 조회 실패:", err);
            alert("데이터를 불러오는 데 실패했습니다.");
        }
    };

    const handlePrevDate = () => {
        fetchProgress("PREV");
    };

    const handleNextDate = () => {
        fetchProgress("NEXT");
    };

    const handleToggleViewMode = async () => {
        const newMode = viewMode === "week" ? "month" : "week";
        setViewMode(newMode);
        await fetchProgress("CURRENT", newMode.toUpperCase());
    };

    const getStartOfWeek = (date) => {
        const day = date.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
    };

    // const getDaysInMonth = (year, month) => {
    //     return new Date(year, month + 1, 0).getDate();
    // };

    const renderWeek = () => {
        const startOfWeek = getStartOfWeek(currentDate);
        return (
            <div className="flex justify-between">
                {Array.from({ length: 7 }, (_, i) => {
                    const day = new Date(startOfWeek);
                    day.setDate(startOfWeek.getDate() + i);
                    const formattedDate = dayjs(day).format("YYYY-MM-DD");

                    return (
                        <div key={i} className="flex flex-col items-center w-12">
                            <span className="text-sm font-medium">
                                {["월", "화", "수", "목", "금", "토", "일"][i]}
                            </span>
                            <div
                                className={`w-7 h-7 my-1 flex items-center justify-center rounded-md ${dateColorMap[formattedDate] || "bg-gray-200"}`}
                            />
                            <span className="text-sm mt-1">{day.getDate()}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    const renderMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        const totalCells = daysInMonth + adjustedFirstDay;
        const totalRows = Math.ceil(totalCells / 7);

        return (
            <div>
                <div className="flex justify-between">
                    {["월", "화", "수", "목", "금", "토", "일"].map((weekday, i) => (
                        <div key={i} className="w-12 text-center font-medium text-sm">{weekday}</div>
                    ))}
                </div>
                {Array.from({ length: totalRows }, (_, week) => (
                    <div key={week} className="flex justify-between">
                        {Array.from({ length: 7 }, (_, i) => {
                            const cellIndex = week * 7 + i;
                            const dayNumber = cellIndex - adjustedFirstDay + 1;

                            if (cellIndex < adjustedFirstDay || dayNumber > daysInMonth) {
                                return <div key={`empty-${week}-${i}`} className="w-12 h-12"></div>;
                            }

                            const formattedDate = dayjs(new Date(year, month, dayNumber)).format("YYYY-MM-DD");

                            return (
                                <div key={`day-${week}-${i}`} className="flex flex-col items-center w-12">
                                    <div
                                        className={`w-7 h-7 my-1 flex items-center justify-center rounded-md ${dateColorMap[formattedDate] || "bg-gray-200"}`}
                                    />
                                    <span className="text-sm mt-1">{dayNumber}</span>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-customShadow">
            {/* 날짜 네비게이션 */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium">
                    {/* {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 */}
                    {dayjs(dateRange.startDate).format("YYYY.MM.DD")} ~{" "}
                    {dayjs(dateRange.endDate).format("MM.DD")}
                </h2>
                <div className="flex items-center space-x-3">
                    <button onClick={handlePrevDate} className="text-lg font-bold">
                        <BsChevronLeft />
                    </button>
                    <button onClick={handleNextDate} className="text-lg font-bold">
                        <BsChevronRight />
                    </button>
                    <button
                        onClick={handleToggleViewMode}
                        className="bg-gray-100 text-customTextBlack text-sm font-semibold px-4 py-1 rounded-xl"
                    >
                        {viewMode === "week" ? "주" : "월"}
                    </button>
                </div>
            </div>

            {/* 캘린더 렌더링 */}
            {viewMode === "week" ? renderWeek() : renderMonth()}
        </div>
    );
}
