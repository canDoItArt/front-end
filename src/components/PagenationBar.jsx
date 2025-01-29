import { BsChevronLeft, BsChevronRight  } from "react-icons/bs";

export default function PagenationBar({ title, onPrevious, onNext }) {
    return (
        <div className="flex items-center justify-between w-full bg-white">
            <button onClick={onPrevious} className="text-gray-600 hover:text-gray-800">
                <BsChevronLeft size={20} />
            </button>
            <span className="text-sm font-bold text-customTextBlack">{title}</span>
            <button onClick={onNext} className="text-gray-600 hover:text-gray-800">
                <BsChevronRight size={20} />
            </button>
        </div>
    );
}