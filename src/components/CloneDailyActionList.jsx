import { useState, useEffect } from "react";
import CheckIcon from "./CheckIcon";

export default function CloneDailyActionList({
    title, content, routine, type, id,
    checked: parentChecked, onClick, firstItem
}) {
    const [selfChecked, setSelfChecked] = useState(false);

    useEffect(() => {
        if (type === "subgoal") {
            setSelfChecked(true);
        }
    }, [id]);

    const handleClick = () => {
        if (type === "dailyaction") {
            onClick?.(id);
        } else if (type === "subgoal") {
            setSelfChecked(prev => !prev);
        }
    };

    const isChecked = type === "dailyaction" ? parentChecked : selfChecked;

    return (
        <div
            onClick={handleClick}
            className={`flex justify-between items-center mx-2 py-4 px-7 border-white cursor-pointer ${
                firstItem ? "border-t-2 border-customMain" : "border-t"
            }`}
        >
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-800">{title}</span>
                    <div className="bg-customMain text-xs py-1 px-2 rounded-md text-white">
                        {routine}회
                    </div>
                </div>
                <span className="font-semibold text-xs text-gray-500">{content}</span>
            </div>
            <CheckIcon checked={isChecked} />
        </div>
    );
}