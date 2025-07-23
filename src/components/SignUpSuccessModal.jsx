import ModalLayout from "./ModalLayout";
import { useNavigate } from "react-router-dom";

export default function SignUpSuccessModal({ onClose }) {
    const navigate = useNavigate();

    const handleConfirm = () => {
        onClose();          // 필요 시 모달 닫기
        navigate("/login"); // 로그인 페이지로 이동
    };

    return (
        <ModalLayout>
            <h2 className="text-base font-bold mb-5 text-center">
                회원가입 완료
            </h2>
            <p className="text-gray-500 text-sm text-center leading-relaxed">
                회원가입이 완료되었습니다.
            </p>

            <div className="mt-6 flex items-center justify-center space-x-4">
                <button
                    className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                    onClick={handleConfirm}
                >
                    확인
                </button>
            </div>
        </ModalLayout>
    );
}
