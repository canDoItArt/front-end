import { BsChevronLeft, BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BottomModalLayout from "./BottomModalLayout";
import OptionList from "./OptionList";
import MainGoalDeleteSubmodal from "./MainGoalDeleteSubmodal";
import MainGoalEditSubmodal from "./MainGoalEditSubmodal";


export default function Header({ title, page, state }) {
  let navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(null);

  let goBack = () => {
    navigate(-1);
  };

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

  const mainGoalOptions = [
    { label: "Main Goal 수정", type: "mainGoalEdit", isDanger: false },
    { label: "Main Goal 삭제", type: "mainGoalDelete", isDanger: true },
  ];

  const subGoalOptions = [
    { label: "Sub Goal 달성 완료", type: "subGoalComplete", isDanger: false },
    { label: "Sub Goal 이름 수정", type: "subGoalRename", isDanger: false },
    { label: "Sub Goal 삭제", type: "subGoalDelete", isDanger: true },
  ];

  return (
    <div className="fixed top-0 max-w-[480px] w-full z-10 flex items-center justify-between bg-white px-6 py-6 ">
      {/* 뒤로 가기 버튼 */}
      <button onClick={goBack}>
        <BsChevronLeft />
      </button>

      {/* 제목 */}
      <h2 className="text-center text-sm font-bold text-customTextBlack">{title}</h2>

      {/* 메뉴 버튼 */}
      <button onClick={toggleModal}>
        <BsThreeDotsVertical
          className={page === "MyArtPage" || page === "SubGoalPage" ? "text-black" : "text-white"}
        />
      </button>

      {/* 모달 */}
      <AnimatePresence>
        {isModalOpen && (
          <BottomModalLayout isOpen={isModalOpen} onClose={toggleModal}>
            {page === "MyArtPage" && <OptionList options={mainGoalOptions} openSubModal={openSubModal} />}
            {page === "SubGoalPage" && <OptionList options={subGoalOptions} openSubModal={openSubModal} />}
          </BottomModalLayout>
        )}
      </AnimatePresence>

      {/* MainGoal 수정 서브모달 */}
      {subModalOpen === "mainGoalEdit" && (
        <BottomModalLayout isOpen={subModalOpen === "mainGoalEdit"} onClose={closeSubModal}>
          <MainGoalEditSubmodal closeSubModal={closeSubModal} state={state} />
        </BottomModalLayout>
      )}

      {/* MainGoal 삭제 서브모달 */}
      {subModalOpen === "mainGoalDelete" && (
        <MainGoalDeleteSubmodal closeSubModal={closeSubModal} />
      )}

      {/* SubGoal 달성완료 서브모달 */}
      {subModalOpen === "subGoalComplete" && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-30 w-72">
          <h2 className="text-lg font-bold mb-4">Sub Goal 달성 완료</h2>
          <p>이 목표를 달성 완료로 설정하시겠습니까?</p>
          <button className="mt-4 p-2 bg-green-500 text-white rounded-lg w-full" onClick={closeSubModal}>
            확인
          </button>
          <button className="mt-2 p-2 bg-gray-200 rounded-lg w-full" onClick={closeSubModal}>
            취소
          </button>
        </div>
      )}

      {/* SubGoal 이름수정 서브모달 */}
      {subModalOpen === "subGoalRename" && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-30" onClick={closeSubModal}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-80" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">Sub Goal 이름 수정</h2>
            <input type="text" className="w-full p-2 border rounded-lg" placeholder="새로운 이름 입력" />
            <button className="mt-4 p-2 bg-blue-500 text-white rounded-lg w-full" onClick={closeSubModal}>
              저장
            </button>
          </div>
        </div>
      )}

      {/* SubGoal 삭제 서브모달 */}
      {subModalOpen === "subGoalDelete" && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-6 rounded-t-2xl shadow-lg z-30">
          <h2 className="text-lg font-bold mb-4">Sub Goal 삭제</h2>
          <p>정말 삭제하시겠습니까?</p>
          <button className="mt-4 p-2 bg-red-500 text-white rounded-lg w-full" onClick={closeSubModal}>
            삭제하기
          </button>
          <button className="mt-2 p-2 bg-gray-200 rounded-lg w-full" onClick={closeSubModal}>
            취소
          </button>
        </div>
      )}
    </div>
  );
}
