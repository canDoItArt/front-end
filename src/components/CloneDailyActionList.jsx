import { useState, useEffect } from "react";
import CheckIcon from "./CheckIcon";

export default function CloneDailyActionList({ title, content, routine, type, id, checked: parentChecked, onClick }) {
    const [selfChecked, setSelfChecked] = useState(false);

    useEffect(() => {
        if (type === "subgoal") {
            setSelfChecked(true); // reset when component mounts
        }
    }, [id]);

    const handleClick = () => {
        if (type === "dailyaction") {
            if (onClick) {
                onClick(id);
            }
        } else if (type === "subgoal") {
            setSelfChecked(prev => !prev);
        }
    };

    const isChecked = type === "dailyaction" ? parentChecked : selfChecked;

    return (
        <div
            onClick={handleClick}
            className="flex justify-between items-center mx-2 py-4 px-7 border-t-2 border-white cursor-pointer"
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
