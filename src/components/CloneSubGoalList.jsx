import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import { motion } from "framer-motion";
import CloneDailyActionList from "./CloneDailyActionList";
import { useState, useEffect } from "react";

export default function CloneSubGoalList({
    name, id, type, dailyaction, activeId, setActiveId, onDailyActionSelect
}) {
    const [selectedId, setSelectedId] = useState(null);
    const isOpen = activeId === id;

    useEffect(() => {
        if (!isOpen) {
            setSelectedId(null);
        }
    }, [activeId, isOpen]);

    const handleClick = (e) => {
        if (e.target.closest(".dailyaction-list")) return;
        setActiveId(isOpen ? null : id);
    };

    const handleDailyActionClick = (clickedId) => {
        setSelectedId((prevId) => (prevId === clickedId ? null : clickedId));
        const selected = dailyaction.find(action => action.id === clickedId);
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
                <div>
                    {dailyaction.map((goal, index) => (
                        <CloneDailyActionList
                            key={goal.id}
                            id={goal.id}
                            title={goal.daily_action_title}
                            content={goal.daily_action_content}
                            routine={goal.routine}
                            type={type}
                            firstItem={index === 0}
                            checked={selectedId === goal.id}
                            onClick={handleDailyActionClick}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
