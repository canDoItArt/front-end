import { BsBookmarkFill } from "react-icons/bs";

export default function MottoCard({ motto }) {
    return (
        <div className="w-full p-3 mb-6 bg-white rounded-xl shadow-customShadow text-center flex items-center justify-start space-x-2">
            <BsBookmarkFill className="text-customRed" />
            <p className="text-sm font-bold text-customText">{motto}</p>
        </div>
    );
}