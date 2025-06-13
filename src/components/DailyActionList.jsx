import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BottomModalLayout from "./BottomModalLayout";
import OptionList from "./OptionList";
import DeleteSubmodal from "./DeleteSubmodal";
import DailyActionEditSubmodal from "./DailyActionEditSubmodal";
import { MdVerified } from "react-icons/md";

export default function DailyActionList({ title, routine, content, achievement }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subModalOpen, setSubModalOpen] = useState(null);

    let toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    let openSubModal = (modalType) => {
        setIsModalOpen(false);
        setTimeout(() => setSubModalOpen(modalType), 300);
    };

    let closeSubModal = () => {
        setSubModalOpen(null);
    };

    const dailyActionOptions = [
        { label: "Daily Action 수정", type: "dailyActionEdit", isDanger: false },
        { label: "Daily Action 삭제", type: "dailyActionDelete", isDanger: true },
    ];

    return (
        <div className="flex flex-col gap-2 justify-between mx-2 my-3 py-4 px-5 rounded-lg shadow-customShadow">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <span className="font-bold text-sm py-1 text-gray-800">{title}</span>
                    {achievement && <MdVerified className="text-yellow-500 text-lg" />}
                </div>
                <div className="flex gap-1">
                    <div className="bg-customMain text-xs font-semibold py-1 px-2 rounded-md text-white">
                        {routine}회
                    </div>
                    <button onClick={toggleModal}>
                        <BsThreeDotsVertical />
                    </button>
                </div>
            </div>
            <span className="font-semibold text-xs text-gray-500">{content}</span>

            {/* 모달 */}
            <AnimatePresence>
                {isModalOpen && (
                    <BottomModalLayout isOpen={isModalOpen} onClose={toggleModal}>
                        <OptionList options={dailyActionOptions} openSubModal={openSubModal} />
                    </BottomModalLayout>
                )}
            </AnimatePresence>

            {/* DailyAction 수정 서브모달 */}
            {subModalOpen === "dailyActionEdit" && (
                <BottomModalLayout isOpen={subModalOpen === "dailyActionEdit"} onClose={closeSubModal}>
                    <DailyActionEditSubmodal closeSubModal={closeSubModal} achievement={achievement} />
                </BottomModalLayout>
            )}

            {/* DailyAction 삭제 서브모달 */}
            {subModalOpen === "dailyActionDelete" && (
                <DeleteSubmodal type="subGoal" closeSubModal={closeSubModal} >
                    Daily Action 삭제 시 <br />
                    설정되어 있던 내용이 사라집니다.
                </DeleteSubmodal>
            )}
        </div>
    );
}