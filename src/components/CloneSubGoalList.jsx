import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import { motion } from "framer-motion";
import CloneDailyActionList from "./CloneDailyActionList";
import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

export default function CloneSubGoalList({
    name,
    id,
    type,
    activeId,
    setActiveId,
    onSubGoalSelect,
    onDailyActionSelect
}) {
    const [dailyActions, setDailyActions] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);

    const isOpen = activeId === id;

    useEffect(() => {
        if (!isOpen) {
            setSelectedId(null);
        } else if (isOpen && !fetched) {
            fetchDailyActions(id); // ✅ 처음 열릴 때만 불러옴
        }
    }, [isOpen]);

    // ✅ API 요청 함수
    const fetchDailyActions = async (subGoalId) => {
        setLoading(true);
        try {
            const response = await api.get(`/api/mandalart/sub-goals/${subGoalId}`);
            const dailyActionsData = response.data?.dailyActions || [];
            setDailyActions(dailyActionsData);
            setFetched(true);
        } catch (error) {
            console.error(`데일리 액션(${subGoalId}) 데이터를 불러오는 중 오류 발생:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (e) => {
        if (e.target.closest(".dailyaction-list")) return;
        setActiveId(isOpen ? null : id);
        onSubGoalSelect?.(isOpen ? null : { id, name });
    };

    const handleDailyActionClick = (clickedId) => {
        setSelectedId((prevId) => (prevId === clickedId ? null : clickedId));
        const selected = dailyActions.find(action => action.id === clickedId);
        onDailyActionSelect?.(selected);
    };

    return (
        <div
            onClick={handleClick}
            className={`items-start m-2 rounded-2xl ${type === "maingoal"
                ? isOpen
                    ? "bg-customMain bg-opacity-10"
                    : ""
                : isOpen
                    ? "bg-customMain bg-opacity-10"
                    : "bg-gray-125"
                }`}
        >
            <div className="flex justify-start gap-2 items-center w-full px-5 py-4">
                {isOpen ? <BsFillCaretDownFill className="text-gray-600" /> : <BsFillCaretRightFill className="text-gray-600" />}
                <span className="font-semibold text-sm">{name}</span>
            </div>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden dailyaction-list w-full"
            >
                {/* 로딩 / 데이터 / 빈 상태 처리 */}
                {loading ? (
                    <div className="text-gray-500 text-sm px-6 py-3">데이터를 불러오는 중...</div>
                ) : dailyActions.length > 0 ? (
                    <div>
                        {dailyActions.map((goal, index) => (
                            <CloneDailyActionList
                                key={goal.id}
                                id={goal.id}
                                title={goal.title}
                                content={goal.content}
                                targetNum={goal.targetNum}
                                type={type}
                                firstItem={index === 0}
                                checked={selectedId === goal.id}
                                onClick={handleDailyActionClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-400 text-xs px-6 py-2">등록된 데일리 액션이 없습니다.</div>
                )}
            </motion.div>
        </div>
    );
}
