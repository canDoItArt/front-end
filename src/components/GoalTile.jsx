import { BsPlus } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

export default function GoalTile({ text, color, type, goal }) {
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

    }
    else if (type === "dailyaction") {
        // 데일리 액션
        return (
            <div
                className={`w-full aspect-[1/1] ${color} bg-opacity-30 rounded-xl flex items-center justify-center text-black font-semibold text-xs p-2 
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
    else if (type === "achievement") {
        // 달성 타입
        return (
            <div
                className={`relative w-full aspect-[1/1] ${color} ${goal === "dailyAction" ? "bg-opacity-30 text-black" : "text-white"
                    } rounded-xl flex items-center justify-center font-semibold text-xs p-2 
            shadow-customShadow overflow-hidden`}
            >
                {/* 반투명 트로피 아이콘 (배경 효과) */}
                <MdVerified className={`${goal === "dailyAction" ? "text-customRed" : "text-white"
                    } opacity-20 absolute text-[80px] z-0`} />

                {/* 텍스트 */}
                <span
                    className="z-10 line-clamp-3 text-center overflow-hidden text-ellipsis whitespace-normal leading-tight break-words"
                >
                    {text}
                </span>
            </div>
        );
    }
    else {
        // 일반 타입
        return (
            <div
                className={`w-full aspect-[1/1] ${color} rounded-xl flex items-center justify-center text-white font-semibold text-xs p-2 
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
