import { useState, useEffect } from "react";
import DailyActionCheck from "./DailyActionCheck";
import ModalLayout from "./ModalLayout";
import api from "../api/axiosInstance";

export default function DailyActionModal({ isOpen, onClose, goal, color }) {
    const [dailyActions, setDailyActions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isAttained = goal?.achievement === true;

    // ✅ API 호출
    useEffect(() => {
        if (!isOpen || !goal?.id) return;

        const fetchDailyActions = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await api.get(`/api/sub-goals/${goal.id}/daily-progress`);
                if (res.data?.code === "200") {
                    setDailyActions(res.data.data);
                } else {
                    setError("데일리 액션 정보를 불러오지 못했습니다.");
                }
            } catch (err) {
                setError("API 요청 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchDailyActions();
    }, [isOpen, goal?.id]);

    // ✅ 렌더링은 항상 하지만 isOpen일 때만 Modal 보이기
    if (!isOpen) {
        return <></>; // Hook 순서는 그대로 유지됨
    }

    return (
        <ModalLayout onClose={onClose}> {/* ✅ ModalLayout 적용 */}
            <h2 className="text-base font-bold mb-4 text-center">{goal.name}</h2>

            {/* 스크롤 가능한 영역 (내용이 많을 때만 스크롤) */}
            <div className="flex-1 overflow-y-auto max-h-[60vh]">
                {loading ? (
                    <div className="text-center text-gray-500 py-6">불러오는 중...</div>
                ) : error ? (
                    <div className="text-center text-red-500 py-6">{error}</div>
                ) : isAttained ? (
                    <div className="text-base text-center text-gray-600 py-6">
                        해당 서브골은 달성 처리 되었습니다.<br />
                    </div>
                ) : dailyActions.length > 0 ? (
                    dailyActions.map((action) => (
                        <DailyActionCheck
                            key={action.dailyActionId}
                            dailyActionId={action.dailyActionId}
                            dailyActionTitle={action.title}
                            dailyActionContent={action.content}
                            checkedDate={action.checkedDate}
                            color={color}
                        />
                    ))
                ) : (
                    <div className="text-base text-center text-gray-600 py-6">
                        데일리 액션이 존재하지 않습니다<br />
                    </div>
                )}
            </div>

            {/* 저장 버튼 */}
            <div className="mt-4 flex justify-center">
                <button
                    type="button"
                    className="w-auto bg-customMain text-white py-3 px-5 rounded-md shadow-lg text-xs font-semibold"
                    onClick={onClose}
                >
                    {(dailyActions.length > 0 && !isAttained) ? "저장" : "닫기"}
                </button>
            </div>
        </ModalLayout>
    );
}
