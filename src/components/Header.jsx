import { BsChevronLeft, BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BottomModalLayout from "./BottomModalLayout";
import OptionList from "./OptionList";
import DeleteSubmodal from "./DeleteSubmodal";
import MainGoalEditSubmodal from "./MainGoalEditSubmodal";
import CompleteSubmodal from "./CompleteSubmodal";
import SubGoalRenameSubmodal from "./SubGoalRenameSubmodal";


export default function Header({ title, page, state }) {
  let navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(null);

  let goBack = () => {
    if (page === "MyArtPage") {
      navigate("/myartlist");
    } else {
      navigate(-1); // 이전 페이지로 이동
    }
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
      <h2 className="text-center text-base font-bold text-customTextBlack">{title}</h2>

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
        <DeleteSubmodal type="mainGoal" closeSubModal={closeSubModal} >
          Main Goal 삭제 시 <br />
          모든 Sub Goal의 내용이 삭제됩니다.
        </DeleteSubmodal>
      )}

      {/* SubGoal 달성완료 서브모달 */}
      {subModalOpen === "subGoalComplete" && (
        <CompleteSubmodal type="SubGoal" closeSubModal={closeSubModal} >
          해당 Sub Goal을 <br />
          달성완료 처리 하시겠습니까?
        </CompleteSubmodal>
      )}

      {/* SubGoal 이름수정 서브모달 */}
      {subModalOpen === "subGoalRename" && (
        <BottomModalLayout isOpen={subModalOpen === "subGoalRename"} onClose={closeSubModal}>
          <SubGoalRenameSubmodal closeSubModal={closeSubModal} state={state} />
        </BottomModalLayout>
      )}

      {/* SubGoal 삭제 서브모달 */}
      {subModalOpen === "subGoalDelete" && (
        <DeleteSubmodal type="subGoal" closeSubModal={closeSubModal} >
          Sub Goal 삭제 시 <br />
          모든 Daily Action이 삭제됩니다.
        </DeleteSubmodal>
      )}
    </div>
  );
}
