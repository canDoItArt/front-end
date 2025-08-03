import { useSessionModal } from "../contexts/SessionModalContext";
import ModalLayout from "./ModalLayout";

export default function SessionExpiredModal() {
    const { visible, hideModal } = useSessionModal();

    if (!visible) return null;

    return (
        <ModalLayout>
            <h2 className="text-base font-bold mb-5 text-center">
                세션 만료
            </h2>
            <p className="text-gray-500 text-sm text-center leading-relaxed">
                세션이 만료되었습니다. 다시 로그인 하시겠습니까?
            </p>

            <div className="mt-6 flex items-center justify-center space-x-4">
                <button
                    className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                    onClick={() => {
                        hideModal();
                        localStorage.removeItem("accessToken");
                        window.location.href = "/login";
                    }}
                >
                    확인
                </button>
            </div>
        </ModalLayout>
        // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        //   <div className="bg-white p-6 rounded shadow-md text-center">
        //     <p className="mb-4 text-sm">세션이 만료되었습니다. 다시 로그인 하시겠습니까?</p>
        //     <button
        //       className="bg-blue-500 text-white px-4 py-2 rounded"
        //       onClick={() => {
        //         hideModal();
        //         window.location.href = "/login";
        //       }}
        //     >
        //       확인
        //     </button>
        //   </div>
        // </div>
    );
}
