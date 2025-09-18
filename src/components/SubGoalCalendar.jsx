import { useMemo } from "react";
import { format, parseISO, isValid, addDays, subDays } from "date-fns";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import hexToColorClass from "../constants/colorMappings";
import slotColors from "../constants/soltNumMappings";

export default function SubGoalCalendar({
  subGoals = [],
  progress = [],
  start_date,
  end_date,
  week_of_month,
  currentWeekStart,
  onChangeWeekStart,
}) {
  // 기존 useMemo → 확장
  const formattedRange = useMemo(() => {
    try {
      if (!start_date || !end_date) return { range: "날짜 정보 없음", year: "", month: "" };

      const startParsed = parseISO(start_date);
      const endParsed = parseISO(end_date);

      if (!isValid(startParsed) || !isValid(endParsed)) {
        return { range: "날짜 형식 오류", year: "", month: "" };
      }

      const start = format(startParsed, "yy.MM.dd");
      const end = format(endParsed, "yy.MM.dd");
      const year = format(startParsed, "yyyy");
      const month = format(startParsed, "M"); // 1~12로 표시

      return {
        range: `(${start}~${end})`,
        year,
        month,
      };
    } catch {
      return { range: "날짜 파싱 실패", year: "", month: "" };
    }
  }, [start_date, end_date, week_of_month]);

  // 구조 분해
  const { range: formattedDateRange, year: parsedYear, month: parsedMonth } = formattedRange;

  // 날짜 이동 핸들러
  const handlePrevDate = () => {
    const current = parseISO(currentWeekStart);
    if (!isValid(current)) return;
    const prev = subDays(current, 7);
    const formatted = format(prev, "yyyy-MM-dd");
    onChangeWeekStart(formatted);
  };

  const handleNextDate = () => {
    const current = parseISO(currentWeekStart);
    if (!isValid(current)) return;
    const next = addDays(current, 7);
    const formatted = format(next, "yyyy-MM-dd");
    onChangeWeekStart(formatted);
  };

  // 진행 중인 서브골
  const pendingGoals = Array.isArray(progress)
    ? [...progress].sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0))
    : [];

  // 달성된 목표만 따로
  const achievedGoals = subGoals.filter((g) => g.attainment);

  return (
    <div className="w-full mt-6 bg-white p-6 rounded-lg shadow-customShadow">
      {/* 날짜 네비게이션 */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1 items-center">
          <h2 className="text-base font-semibold">
            {parsedYear}년 {parsedMonth}월 {week_of_month}주차
          </h2>
          <h2 className="text-sm font-medium text-gray-400">{formattedDateRange}</h2>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={handlePrevDate} className="text-lg font-bold">
            <BsChevronLeft />
          </button>
          <button onClick={handleNextDate} className="text-lg font-bold">
            <BsChevronRight />
          </button>
        </div>
      </div>

      {/* 진행 중인 서브골 */}
      <ul className="space-y-4">
        {pendingGoals.map((goal, index) => (
          <li
            key={goal.subGoalName}
            className="bg-gray-50 px-4 py-3 rounded-md shadow-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                <span className="font-medium flex items-center gap-1">
                  {goal.subGoalName}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {goal.rate}%
              </span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${slotColors[goal.slotNum] || "bg-gray-400"
                  }`}
                style={{
                  width: `${goal.rate}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* 달성된 서브골 */}
      {achievedGoals.length > 0 && (
        <div className="mt-8">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">
            <MdVerified className="text-green-500 text-xl" />
            달성된 서브골
          </h3>
          <div className="flex flex-wrap gap-2">
            {achievedGoals.map((goal) => (
              <span
                key={goal.id}
                className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full transition ${slotColors[goal.slotNum]} bg-opacity-20`}
                style={{
                  color: slotColors[goal.slotNum],
                }}
              >
                <MdVerified />
                {goal.subGoalName}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
