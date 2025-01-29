export default function GoalTile({ text, color, type }) {
    if (type === "title") {
        // title 타입
        return (
            <div
                className={`w-full aspect-[1/1] bg-white rounded-full flex items-center justify-center text-customTextBlack font-bold text-xs p-2 
                shadow-[0_4px_6px_rgba(0,0,0,0.05),0_-4px_6px_rgba(0,0,0,0.05)]`}
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
                shadow-[0_4px_6px_rgba(0,0,0,0.05),0_-4px_6px_rgba(0,0,0,0.05)]`}
            />
        );
    } else {
        // 일반 타입
        return (
            <div
                className={`w-full aspect-[1/1] ${color} rounded-xl flex items-center justify-center text-white font-medium text-xs p-2 
                shadow-[0_4px_6px_rgba(0,0,0,0.05),0_-4px_6px_rgba(0,0,0,0.05)]`}
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
