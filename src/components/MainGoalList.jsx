import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Ban, Trophy } from "lucide-react"; // 아이콘 라이브러리 사용

const stateIcons = {
  active: <Star className="w-5 h-5 text-gray-500 stroke-2" />, // 검정 테두리 별
  rep: <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 stroke-2" />, // 노란색 별
  inactive: <Ban className="w-5 h-5 text-red-500" />, // 빨간색 금지마크
  attainment: <Trophy className="w-5 h-5 text-yellow-500" />, // 트로피 아이콘
};

export default function MainGoalList({ name, state }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/myart');
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex justify-between items-center p-6 bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.05),0_-4px_6px_rgba(0,0,0,0.05)] w-full"
    >
      <span className="font-semibold text-sm">{name}</span>
      <div>{stateIcons[state]}</div>
    </button>
  );
}
