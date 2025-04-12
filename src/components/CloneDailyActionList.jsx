import { useState } from "react";
import CheckIcon from "./CheckIcon";

export default function CloneDailyActionList({ title, content, routine, type, id }) {
    const [checked, setChecked] = useState(true);

    const handleClick = () => {
        setChecked((prev) => !prev);
    };

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
            <CheckIcon checked={checked} />
        </div>
    );
}
