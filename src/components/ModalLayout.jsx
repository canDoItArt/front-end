export default function ModalLayout({ children, onClose }) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
            onClick={onClose}
        >
            <div
                className="w-3/4 max-w-md bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* children 요소가 부모 크기를 인식하도록 설정 */}
                <div className="w-full">{children}</div>
            </div>
        </div>
    );
}
