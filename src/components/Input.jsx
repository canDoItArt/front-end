import { useEffect, useState } from "react";

export default function Input({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    required = false,
    children,
    readOnly = false,
    error = "", // error prop 추가
    successMessage = "", // ✅ 성공 메시지 추가
    disabled = false,
    showTimer = false, // ✅ 인증 코드 타이머 표시 여부
    duration = 180, // ✅ 기본 3분 (초 단위)
    onTimerExpire,
}) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isExpired, setIsExpired] = useState(false);

    // ✅ showTimer가 true일 때 타이머 작동
    useEffect(() => {
        if (!showTimer) {
            setTimeLeft(180);
            return;
        }

        if (timeLeft <= 0) {
            setIsExpired(true);
            onTimerExpire?.();
            return;
        }

        const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [showTimer, timeLeft]);


    // ✅ 남은 시간 MM:SS 포맷
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? `0${s}` : s}`;
    };

    return (
        <div className="mb-10 mt-4">
            <label htmlFor={id} className="block text-sm font-medium text-customTextBlack">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="mt-2 flex items-stretch justify-between gap-2">
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    className={`p-3 w-full rounded-xl bg-gray-70 text-gray-900 placeholder-customTextGray text-sm transition-colors duration-300 ease-in-out focus:outline-none
                    ${error ? "border border-red-500" : "focus:border-customMain"}`}
                />
                {children}
            </div>

            {/* 에러 메시지 표시 */}
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

            {/* ✅ 성공 메시지 표시 */}
            {successMessage && (
                <p className="text-xs text-green-500 mt-2">{successMessage}</p>
            )}

            {/* ✅ 3분 타이머 표시 */}
            {showTimer && !isExpired && (
                <p className="text-xs text-red-500 mt-2">
                    남은 시간: {formatTime(timeLeft)}
                </p>
            )}

            {/* ✅ 타이머 만료 시 안내 문구 */}
            {isExpired && (
                <p className="text-xs text-red-500 mt-2">
                    시간이 만료되었습니다. 다시 인증 코드를 발급해주세요.
                </p>
            )}
        </div>
    );
}
