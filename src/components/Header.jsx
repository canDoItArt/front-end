import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Header({ title }) { // title을 props로 받음
  let navigate = useNavigate();

  let goBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex items-center bg-white mt-4 mb-10 py-2">
      {/* 뒤로 가기 버튼 */}
      <button onClick={goBack}>
        <BsChevronLeft />
      </button>
      {/* 제목 */}
      <h1 className="flex-grow text-center font-bold text-customTextBlack">
        {title}
      </h1>
    </div>
  );
}
