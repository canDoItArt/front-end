import { useState, useEffect } from "react";
import CloneSubGoalList from "./CloneSubGoalList";
import { motion } from "framer-motion";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

// props에 onSubGoalSelect 추가
export default function CloneMainGoalList({ name, id, type, subgoal, activeId, setActiveId, onSubGoalSelect }) {
    const [activeSubId, setActiveSubId] = useState(null);

    const isOpen = activeId === id;

    useEffect(() => {
        if (!isOpen) {
            setActiveSubId(null);
            onSubGoalSelect(null); // 열려 있지 않으면 선택 해제
        }
    }, [activeId, isOpen, onSubGoalSelect]);

    const handleClick = (e) => {
        if (e.target.closest(".subgoal-list")) return;
        setActiveId(isOpen ? null : id);
    };

    const handleSubGoalClick = (subGoalId) => {
        setActiveSubId(subGoalId);
        onSubGoalSelect(subgoal.find(g => g.id === subGoalId));
    };

    const subGoalListContent = (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden subgoal-list w-full"
        >
            <div>
                {subgoal.map((goal) => (
                    <div key={goal.id} onClick={() => handleSubGoalClick(goal.id)}>
                        <CloneSubGoalList
                            id={goal.id}
                            name={goal.name}
                            type={type}
                            dailyaction={goal.dailyActions}
                            activeId={activeSubId}
                            setActiveId={setActiveSubId}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div>
            <div
                onClick={handleClick}
                className={`flex flex-col items-start justify-center rounded-xl w-full transition-colors duration-300 
                    ${isOpen ? "border-0.1 border-customMain bg-opacity-10 bg-customMain shadow-customMainShadow" : " bg-white"}`}
            >
                <div className="flex justify-between items-center w-full px-7 py-5">
                    <span className="font-semibold text-black text-base">{name}</span>
                    {isOpen ? (
                        <BsChevronUp className="text-customMain scale-125" />
                    ) : (
                        <BsChevronDown className="text-gray-600 scale-125" />
                    )}
                </div>

                {type === "maingoal" && subGoalListContent}
            </div>
            {type !== "maingoal" && subGoalListContent}
        </div>
    );
}
