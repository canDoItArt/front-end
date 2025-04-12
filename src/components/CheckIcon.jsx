export default function CheckIcon({ checked, className = "w-4 h-4 text-customMain" }) {
    return (
        <div
            className={`w-5 h-5 border rounded flex items-center justify-center bg-white border-gray-300 ${
                checked ? " border-customMain shadow-inner" : ""
            }`}
        >
            {checked && (
                <svg
                    className={className}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            )}
        </div>
    );
}
