import { useState, useEffect } from "react";
import Tower from "./Tower";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import dayjs from "dayjs";

export default function TowerCalendar({ progress }) {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜 상태를 관리
  const [viewMode, setViewMode] = useState("week"); // 'week' 또는 'month' 뷰 모드를 관리
  const [dateColorMap, setDateColorMap] = useState({}); // 날짜별 컬러 리스트 상태

  useEffect(() => {
    if (progress && Array.isArray(progress)) {
      const mappedColors = progress.reduce((acc, { checkedDate, slotNum }) => {
        if (!acc[checkedDate]) acc[checkedDate] = [];
        acc[checkedDate].push(...slotNum);
        return acc;
      }, {});
      setDateColorMap(mappedColors);
    }
  }, [progress]);

  const getStartOfWeek = (date) => {
    const day = date.getDay(); // 요일 (0: 일요일, 6: 토요일)
    const diff = day === 0 ? -6 : 1 - day; // 일요일이면 -6, 나머지는 월요일 기준 계산
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate(); // 다음 달의 0번째 날짜는 현재 달의 마지막 날
  };

  const renderWeek = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const formattedDate = dayjs(day).format("YYYY-MM-DD");

      // 해당 날짜의 컬러 리스트를 가져오기
      const dayColors = dateColorMap[formattedDate] || [];

      return (
        <div key={i} className="flex flex-col items-center w-12">
          <span className="text-sm font-medium">
            {["월", "화", "수", "목", "금", "토", "일"][i]}
          </span>
          <div className="w-full h-10 flex items-center justify-center p-2">
            <Tower colorList={dayColors} /> {/* 색상 리스트 전달 */}
          </div>
          <span className="text-sm mt-1">{day.getDate()}</span>
        </div>
      );
    });

    return <div className="flex justify-between">{days}</div>;
  };

  const renderMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const totalCells = daysInMonth + adjustedFirstDay;
    const totalRows = Math.ceil(totalCells / 7);

    const weeks = [];
    let day = 1;

    const weekdays = (
      <div className="flex justify-between">
        {["월", "화", "수", "목", "금", "토", "일"].map((weekday, i) => (
          <div key={i} className="w-12 text-center font-medium text-sm">
            {weekday}
          </div>
        ))}
      </div>
    );

    for (let week = 0; week < totalRows; week++) {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const cellIndex = week * 7 + i;
        if (cellIndex < adjustedFirstDay || day > daysInMonth) {
          days.push(
            <div key={`empty-${cellIndex}`} className="w-12 h-12"></div>
          );
        } else {
          const formattedDate = dayjs(new Date(year, month, day)).format("YYYY-MM-DD");
          const dayColors = dateColorMap[formattedDate] || [];

          days.push(
            <div key={day} className="flex flex-col items-center w-12">
              <div className="w-full h-10 flex items-center justify-center p-2">
                <Tower colorList={dayColors} /> {/* 색상 리스트 전달 */}
              </div>
              <span className="text-sm mt-1">{day++}</span>
            </div>
          );
        }
      }
      weeks.push(
        <div key={`week-${week}`} className="flex justify-between">
          {days}
        </div>
      );
    }

    return (
      <div>
        {weekdays}
        {weeks}
      </div>
    );
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>
        <div className="flex items-center space-x-3">
          <button onClick={handlePrev} className="text-lg font-bold">
            <BsChevronLeft />
          </button>
          <button onClick={handleNext} className="text-lg font-bold">
            <BsChevronRight />
          </button>
          <div className="flex justify-end">
            <button
              onClick={() => setViewMode(viewMode === "week" ? "month" : "week")}
              className="bg-gray-100 text-customTextBlack text-sm font-semibold px-4 py-1 rounded-xl"
            >
              {viewMode === "week" ? "주" : "월"}
            </button>
          </div>
        </div>
      </div>
      {viewMode === "week" ? renderWeek() : renderMonth()}
    </div>
  );
}
