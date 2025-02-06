import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // 아이콘 import

export default function CustomDropdown({ selectedState, setSelectedState }) {
    const [isOpen, setIsOpen] = useState(false);
    const options = [
        { value: "all", label: "전체보기" },
        { value: "active", label: "활성화" },
        { value: "inactive", label: "사용중지" },
        { value: "attainment", label: "달성" },
    ];

    return (
        <div className="relative w-24">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full bg-white border border-gray-300 text-gray-700 font-semibold text-xs px-3 py-2 rounded-md flex items-center justify-between focus:outline-none"
            >
                {options.find(opt => opt.value === selectedState)?.label}
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {isOpen && (
                <ul className="absolute w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 py-2 z-10">
                    {options.map(option => (
                        <li
                            key={option.value}
                            onClick={() => {
                                setSelectedState(option.value);
                                setIsOpen(false);
                            }}
                            className={`px-3 py-2 text-xs cursor-pointer hover:bg-gray-100 ${
                                selectedState === option.value ? "font-bold text-blue-500" : "text-gray-700"
                            }`}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}