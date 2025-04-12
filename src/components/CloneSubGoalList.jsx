import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import React from "react";
import CloneDailyActionList from "./CloneDailyActionList";
import { motion } from "framer-motion";
import subGoalMockData from "../mocks/subGoal";

export default function CloneSubGoalList({ name, id, type, activeId, setActiveId }) {
    const isOpen =
        type === "maingoal"
            ? activeId.includes(id)
            : activeId === id;

    const handleClick = (e) => {
        if (e.target.closest(".dailyaction-list")) return;

        if (type === "maingoal") {
            // 여러 개 열 수 있게 배열 처리
            if (activeId.includes(id)) {
                setActiveId(activeId.filter((item) => item !== id));
            } else {
                setActiveId([...activeId, id]);
            }
        } else {
            // 하나만 열 수 있게 단일 값 처리
            setActiveId(isOpen ? null : id);
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
                    {subGoalMockData[0].dailyActions.map((goal) => (
                        <CloneDailyActionList
                            key={goal.id}
                            id={goal.id}
                            title={goal.title}
                            content={goal.content}
                            routine={goal.routine}
                            type={type}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
