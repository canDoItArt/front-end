import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import CloneDailyActionList from "./CloneDailyActionList";
import { motion } from "framer-motion";
import subGoalMockData from "../mocks/subGoal";

export default function CloneSubGoalList({ name, id, type, activeId, setActiveId }) {
    const [resetKey, setResetKey] = useState(0);
    const [selectedId, setSelectedId] = useState(null);

    const isOpen =
        type === "maingoal"
            ? activeId.includes(id)
            : activeId === id;

    useEffect(() => {
        // 열림 상태가 바뀔 때마다 resetKey를 증가시켜 CloneDailyActionList 리셋 유도
        setResetKey((prev) => prev + 1);
    }, [isOpen]);

    const handleClick = (e) => {
        if (e.target.closest(".dailyaction-list")) return;

        if (type === "maingoal") {
            if (activeId.includes(id)) {
                setActiveId(activeId.filter((item) => item !== id));
            } else {
                setActiveId([...activeId, id]);
            }
        } else {
            setActiveId(isOpen ? null : id);
        }
    };

    const handleDailyActionClick = (clickedId) => {
        if (type === "dailyaction") {
            // dailyaction이면 하나만 체크되게
            setSelectedId((prevId) => (prevId === clickedId ? null : clickedId));
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`items-start m-2 rounded-2xl
                ${isOpen ? "bg-customMain bg-opacity-10" : "bg-gray-125"}`}
        >
            <div className="flex justify-start gap-2 items-center w-full px-5 py-4">
                {isOpen ? (
                    <BsFillCaretDownFill className="text-gray-600" />
                ) : (
                    <BsFillCaretRightFill className="text-gray-600" />
                )}
                <span className="font-semibold text-sm">{name}</span>
            </div>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden dailyaction-list w-full"
            >
                <div>
                    {subGoalMockData[0].dailyActions.map((goal, index) => (
                        <CloneDailyActionList
                            key={`${resetKey}-${goal.id}`}
                            id={goal.id}
                            title={goal.title}
                            content={goal.content}
                            routine={goal.routine}
                            type={type}
                            checked={type === "dailyaction" ? selectedId === goal.id : type === "subgoal"}
                            onClick={handleDailyActionClick}
                            firstItem={index === 0} // 첫 번째 아이템인지 여부 전달
                        />
                    ))}

                </div>
            </motion.div>
        </div>
    );
}
