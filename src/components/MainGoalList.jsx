import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Ban, Trophy } from "lucide-react";
import ModalLayout from "./ModalLayout";

export default function MainGoalList({ name, state, onSetRep }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (state !== "inactive") {
      navigate("/myart");
    }
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
    if (state === "active") {
      setIsModalOpen(true);
    }
  };

  const confirmRep = () => {
    onSetRep(); // 상위에 요청
    setIsModalOpen(false);
  };

  const stateIcons = {
    active: (
      <button onClick={handleIconClick}>
        <Star className="w-5 h-5 text-gray-500 stroke-2" />
      </button>
    ),
    rep: <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 stroke-2" />,
    inactive: <Ban className="w-5 h-5 text-red-500" />,
    attainment: <Trophy className="w-5 h-5 text-yellow-500" />,
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="flex justify-between items-center p-6 bg-white rounded-lg shadow-customShadow w-full"
      >
        <span className="font-semibold text-sm">{name}</span>
        <div>{stateIcons[state]}</div>
      </button>

      {isModalOpen && (
        <ModalLayout onClose={() => setIsModalOpen(false)}>
          <h2 className="text-base font-bold mb-5 text-center">대표 마이라트 설정</h2>
          <p className="text-gray-500 text-sm text-center leading-relaxed">
            해당 메인골을 대표 마이라트로 설정하시겠습니까?
          </p>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              className="p-2 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              취소
            </button>
            <button
              className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
              onClick={confirmRep}
            >
              저장
            </button>
          </div>
        </ModalLayout>
      )}
    </>
  );
}
