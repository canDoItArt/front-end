import { BsPlus } from "react-icons/bs";

export default function GoalTile({ text, color, type }) {
    if (type === "title") {
        // title 타입
        return (
            <div
                className={`w-full aspect-[1/1] bg-white rounded-full flex items-center justify-center text-customTextBlack font-bold text-xs p-2 
                shadow-customShadow`}
            >
                <span
                    className="line-clamp-3 text-center overflow-hidden text-ellipsis whitespace-normal leading-tight break-words"
                >
                    {text}
                </span>
            </div>
        );
    } else if (type === "empty") {
        // 빈 값 타입
        return (
            <div
                className={`w-full aspect-[1/1] bg-customEmptyTile rounded-xl 
                shadow-customShadow`}
            />
        );
    }
    else if (type === "add") {
        // 추가 타입
        return (
            <div
                className={`w-full aspect-[1/1] bg-customEmptyTile rounded-xl flex items-center justify-center
                    shadow-customShadow`}
            >
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-300">
                    <BsPlus className="text-gray-800 text-2xl" />
                </div>
            </div>
        );

    } else {
        // 일반 타입
        return (
            <div
                className={`w-full aspect-[1/1] ${color} rounded-xl flex items-center justify-center text-white font-medium text-xs p-2 
                shadow-customShadow`}
            >
                <span
                    className="line-clamp-3 text-center overflow-hidden text-ellipsis whitespace-normal leading-tight break-words"
                >
                    {text}
                </span>
            </div>
        );
    }
}
