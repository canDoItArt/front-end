import ModalLayout from "./ModalLayout";

export default function SignUpModal({ message, onClose, onConfirm }) {
    return (
        <ModalLayout>
            <h2 className="text-base font-bold mb-5 text-center">
                회원가입
            </h2>
            <p className="text-gray-500 text-sm text-center leading-relaxed">
                {message}
            </p>

            <div className="mt-6 flex items-center justify-center space-x-4">
                <button
                    className="p-3 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
                    onClick={onClose}
                >
                    취소
                </button>
                <button
                    className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                    onClick={onConfirm}
                >
                    확인
                </button>
            </div>
        </ModalLayout>
    );
}