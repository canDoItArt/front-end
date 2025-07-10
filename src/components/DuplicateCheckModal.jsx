import ModalLayout from "./ModalLayout";

export default function DuplicateCheckModal({ message, onClose }) {
    return (
        <ModalLayout>
            <h2 className="text-base font-bold mb-5 text-center">
                중복 확인
            </h2>
            <p className="text-gray-500 text-sm text-center leading-relaxed">
                {message}
            </p>

            <div className="mt-6 flex items-center justify-center space-x-4">
                <button
                    className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                    onClick={onClose}
                >
                    확인
                </button>
            </div>
        </ModalLayout>
    );
}