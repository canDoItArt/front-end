import { Star, Ban, Trophy } from "lucide-react"; // 아이콘 라이브러리 사용
import { useState, useEffect } from "react";
import Input from "./Input";
import StatusButton from "./StatusButton";
import api from "../api/axiosInstance";

export default function MainGoalEditSubmodal({ closeSubModal, mainGoalId, title: initialTitle, state, onEditSuccess }) {
    const [title, setTitle] = useState(initialTitle || "");
    const [selectedStatus, setSelectedStatus] = useState(state || "ACTIVITY");
    const [titleError, setTitleError] = useState(""); // 에러 상태 추가
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state === "ACTIVITY") {
            setSelectedStatus("ACTIVITY");
        } else if (state === "ATTAINMENT") {
            setSelectedStatus("ATTAINMENT");
        } else if (state === "PAUSE") {
            setSelectedStatus("PAUSE");
        }
    }, [state]);

    const handleSave = async () => {
        if (title.trim() === "") {
            setTitleError("이름 값은 필수 값입니다.");
            return; // 저장 로직 실행 안함
        }

        setTitleError(""); // 에러 초기화
        // 저장 로직 실행 가능
        try {
            setLoading(true);
            const res = await api.patch(`/api/main-goals/${mainGoalId}`, {
                name: title,
                status: selectedStatus,
            });

            console.log("수정 성공:", res.data);
            const updatedData = res.data.data;
            alert("메인골이 수정되었습니다.");
            // 부모에 수정된 데이터 전달
            if (onEditSuccess) {
                onEditSuccess(updatedData);
            }
            closeSubModal();
        } catch (err) {
            console.error("수정 실패:", err);
            alert("메인골 수정에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 text-center">
            <h2 className="text-base font-bold mb-7">Main Goal 수정</h2>

            {/* 이름 수정 */}
            <div className="text-left">
                <Input
                    id="title"
                    type="text"
                    label={"이름 수정"}
                    value={title} // 상태 값 반영
                    onChange={(e) => setTitle(e.target.value)} // 입력 변경 반영
                    placeholder="MainGoal의 이름을 입력하세요"
                    error={titleError}
                />
            </div>

            {/* 상태 변경 */}
            <div className="text-left">
                <p className="text-sm font-medium text-customTextBlack mb-4">상태 변경</p>
                <div className="px-5 grid grid-cols-3 gap-8">
                    <StatusButton
                        icon={<Star className="w-5 h-5 text-yellow-500 fill-yellow-500 stroke-2" />}
                        label="활성화"
                        onClick={() => setSelectedStatus("ACTIVITY")}
                        className={selectedStatus === "ACTIVITY" ? "border-0.1 border-customMain" : "border border-transparent"}
                    />
                    <StatusButton
                        icon={<Trophy className="w-5 h-5 text-yellow-500" />}
                        label="달성"
                        onClick={() => setSelectedStatus("ATTAINMENT")}
                        className={selectedStatus === "ATTAINMENT" ? "border-0.1 border-customMain" : "border border-transparent"}
                    />
                    <StatusButton
                        icon={<Ban className="w-5 h-5 text-red-500" />}
                        label="사용중지"
                        onClick={() => setSelectedStatus("PAUSE")}
                        className={selectedStatus === "PAUSE" ? "border-0.1 border-customMain" : "border border-transparent"}
                    />
                </div>
            </div>

            {/* 버튼 그룹 */}
            <div className="mt-6 flex justify-center space-x-4">
                <button
                    className="p-3 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
                    onClick={closeSubModal}
                >
                    취소
                </button>
                <button
                    className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                    onClick={handleSave}
                >
                    {loading ? "저장중..." : "저장"}
                </button>
            </div>
        </div>
    );
}
