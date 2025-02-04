import { useState } from "react";
import hexToColorClass from "../constants/colorMappings";

export default function DailyActionCheck({
    daily_action_title,
    daily_action_content,
    checked_dates,
    sub_goal_color
}) {
    const days = ["월", "화", "수", "목", "금", "토", "일"];

    // checked_dates를 Date 객체로 변환하여 요일 추출 (0을 월요일로 변환)
    const initialCheckedDays = checked_dates.map(date => {
        const dayIndex = new Date(date).getDay(); // 0(일) ~ 6(토)
        return dayIndex === 0 ? 6 : dayIndex - 1; // 0(일) → 6(일), 1(월) → 0(월), ..., 6(토) → 5(토)
    });

    // 상태로 관리하여 클릭 시 토글 가능하도록 설정
    const [checkedDays, setCheckedDays] = useState(initialCheckedDays);

    // 매핑된 Tailwind 색상 클래스 가져오기 (기본값: bg-gray-400)
    const bgColorClass = hexToColorClass[sub_goal_color] || "bg-gray-400";

    // 버튼 클릭 시 색상 토글
    const toggleDay = (index) => {
        setCheckedDays(prevCheckedDays =>
            prevCheckedDays.includes(index)
                ? prevCheckedDays.filter(day => day !== index) // 이미 선택된 경우 제거
                : [...prevCheckedDays, index] // 선택되지 않은 경우 추가
        );
    };

    return (
        <div className="p-4 mb-2">
            <h3 className="font-bold text-sm mb-1">{daily_action_title}</h3>
            <p className="text-gray-600 text-xs">{daily_action_content}</p>
            <div className="flex justify-between mt-2">
                {days.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <span className="text-xs mb-1">{day}</span>
                        <button
                            className={`w-6 h-6 rounded-md ${
                                checkedDays.includes(index) ? bgColorClass : "bg-gray-200"
                            }`}
                            onClick={() => toggleDay(index)}
                        ></button>
                    </div>
                ))}
            </div>
        </div>
    );
}
