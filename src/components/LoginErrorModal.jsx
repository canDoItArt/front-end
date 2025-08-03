import ModalLayout from "./ModalLayout";

export default function LoginErrorModal({ onClose }) {

    return (
        <ModalLayout>
            <h2 className="text-base font-bold mb-5 text-center">
                로그인 오류
            </h2>
            <p className="text-gray-500 text-sm text-center leading-relaxed">
                이메일 또는 비밀번호가 올바르지 않습니다.
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
