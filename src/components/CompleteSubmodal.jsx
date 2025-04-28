import ModalLayout from "./ModalLayout";

export default function CompleteSubmodal({ type, children, closeSubModal }) {
    return (
        <ModalLayout onClose={closeSubModal}>
            <h2 className="text-base font-bold mb-5 text-center">{type} 달성완료 </h2>
            <p className="text-gray-500 text-sm text-center leading-relaxed">
                {children}
            </p>

            <div className="mt-6 flex justify-center space-x-4">
                <button
                    className="p-2 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
                    onClick={closeSubModal}
                >
                    취소
                </button>
                <button
                    className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                    onClick={closeSubModal}
                >
                    확인
                </button>
            </div>
        </ModalLayout>
    );
}