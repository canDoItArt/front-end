import { BsChevronLeft, BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BottomModalLayout from "./BottomModalLayout";
import OptionList from "./OptionList";
import DeleteSubmodal from "./DeleteSubmodal";
import MainGoalEditSubmodal from "./MainGoalEditSubmodal";
import SubGoalRenameSubmodal from "./SubGoalRenameSubmodal";


export default function Header({ title: initialTitle, page, state: initialState, mainGoalId }) {
  let navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(null);

  // 메인골 수정 후 갱신할 state
  const [currentTitle, setCurrentTitle] = useState(initialTitle);
  const [currentState, setCurrentState] = useState(initialState);

  let goBack = () => {
    if (page === "MyArtPage" || page === "CreateMyArtPage") {
      navigate("/myartlist");
    } else if (page === "SubGoalPage") {
      navigate(`/myart/${mainGoalId}`);
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
    { label: "Sub Goal 수정", type: "subGoalRename", isDanger: false },
    { label: "Sub Goal 삭제", type: "subGoalDelete", isDanger: true },
  ];


  return (
    <div className="fixed top-0 max-w-[480px] w-full z-10 flex items-center justify-between bg-white px-6 py-6 ">
      {/* 뒤로 가기 버튼 */}
      <button onClick={goBack}>
        <BsChevronLeft />
      </button>

      {/* 제목 */}
      <h2 className="text-center text-base font-bold text-customTextBlack">{currentTitle}</h2>

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
          <MainGoalEditSubmodal
            closeSubModal={closeSubModal}
            mainGoalId={mainGoalId}
            title={currentTitle}
            state={currentState}
            // 👇 수정 성공 시 부모 state 갱신
            onEditSuccess={(updatedData) => {
              setCurrentTitle(updatedData.name);
              setCurrentState(updatedData.status);
            }}
          />
        </BottomModalLayout>
      )}

      {/* MainGoal 삭제 서브모달 */}
      {subModalOpen === "mainGoalDelete" && (
        <DeleteSubmodal
          type="mainGoal"
          mainGoalId={mainGoalId}
          closeSubModal={closeSubModal}
          onDeleteSuccess={() => {
            alert("정상적으로 메인골이 삭제되었습니다.");
            goBack();
          }}
        >
          Main Goal 삭제 시 <br />
          모든 Sub Goal의 내용이 삭제됩니다.
        </DeleteSubmodal>
      )}

      {/* SubGoal 수정 서브모달 */}
      {subModalOpen === "subGoalRename" && (
        <BottomModalLayout isOpen={subModalOpen === "subGoalRename"} onClose={closeSubModal}>
          <SubGoalRenameSubmodal closeSubModal={closeSubModal} title={title} state={state} />
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
