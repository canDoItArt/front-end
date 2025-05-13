import { useState, useEffect } from "react";
import CloneSubGoalList from "./CloneSubGoalList";
import { motion } from "framer-motion";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export default function CloneMainGoalList({ name, id, type, subgoal, activeId, setActiveId }) {
    const [activeSubId, setActiveSubId] = useState(null);

    const isOpen = activeId === id;

    useEffect(() => {
        if (!isOpen) {
            setActiveSubId(null);
        }
    }, [activeId, isOpen]);

    const handleClick = (e) => {
        if (e.target.closest(".subgoal-list")) return;
        setActiveId(isOpen ? null : id);
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
                    <CloneSubGoalList
                        key={goal.id}
                        id={goal.id}
                        name={goal.name}
                        type={type}
                        dailyaction={goal.dailyActions}
                        activeId={activeSubId}
                        setActiveId={setActiveSubId}
                    />
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

                {/* type이 "maingoal"인 경우 내부에 렌더링 */}
                {type === "maingoal" && subGoalListContent}
            </div>

            {/* type이 "maingoal"이 아닌 경우 외부에 렌더링 */}
            {type !== "maingoal" && subGoalListContent}
        </div>
    );
}
