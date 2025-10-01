import ModalLayout from "./ModalLayout";
import api from "../api/axiosInstance";

export default function DeleteSubmodal({ type, mainGoalId, subGoalId, dailyActionId, children, closeSubModal, onDeleteSuccess }) {

    const handleDelete = async () => {
        try {
            if (type === "mainGoal") {
                await api.delete(`/api/main-goals/${mainGoalId}`);
            } else if (type === "subGoal") {
                await api.delete(`/api/sub-goals/${subGoalId}`);
            } else if (type === "dailyAction") {
                await api.delete(`/api/daily-actions/${dailyActionId}`);
            }

            // 성공 시 UI 반영
            if (onDeleteSuccess) {
                onDeleteSuccess();
            }

            closeSubModal();
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };


    return (
        <ModalLayout onClose={closeSubModal}>
            <h2 className="text-base font-bold mb-5 text-center">정말로 삭제하시겠어요?</h2>
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
                    onClick={handleDelete}
                >
                    삭제
                </button>
            </div>
        </ModalLayout>
    );
}