import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import hexToColorClass from "../constants/colorMappings";
import api from "../api/axiosInstance";
import ModalLayout from "../components/ModalLayout";

export default function CreateMyArtPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { importedGoal } = location.state || {};

    const [mainGoal, setMainGoal] = useState("");
    const [subGoalInput, setSubGoalInput] = useState("");
    const [subGoals, setSubGoals] = useState([]);

    const [isMyartCreateModalOpen, setIsMyartCreateModalOpen] = useState(false); // 현재 비밀번호 확인 모달 오픈 상태
    const [myartCreateModalMessage, setMyartCreateModalMessage] = useState("");  // 현재 비밀번호 확인 모달에 띄울 메시지

    const colorClasses = Object.values(hexToColorClass);

    useEffect(() => {
        if (importedGoal) {
            setMainGoal(importedGoal.name || "");
            const importedSubGoals = importedGoal.subGoals?.map(sub => sub.name) || [];
            setSubGoals(importedSubGoals);
        }
    }, [importedGoal]);

    const handleAddSubGoal = () => {
        if (subGoalInput.trim() === "" || subGoals.length >= 8) return;
        setSubGoals([...subGoals, subGoalInput.trim()]);
        setSubGoalInput("");
    };

    const handleDeleteSubGoal = (index) => {
        const newGoals = subGoals.filter((_, i) => i !== index);
        setSubGoals(newGoals);
    };

    const cloneButtonClick = () => {
        navigate('/importclone', { state: { type: 'maingoal' } });
    };

    // 메인골 생성하기 API 연동
    const createButtonClick = async () => {
        try {
            const response = await api.post("/api/main-goals", {
                name: mainGoal,
                subGoals: subGoals.map((goal) => ({
                    name: goal,
                    dailyActions: []
                })) // 서버 요구사항에 맞게 객체 배열로 변환
            });

            if (response.data.code === "200") {
                console.log("메인골 생성 성공:", response.data.data);
                setIsMyartCreateModalOpen(true);
                setMyartCreateModalMessage("메인골이 성공적으로 생성되었습니다.");
            } else {
                //alert("메인골 생성에 실패했습니다.");
                setIsMyartCreateModalOpen(true);
                setMyartCreateModalMessage("메인골 생성에 실패했습니다.");
            }
        } catch (error) {
            console.error("메인골 생성 에러:", error);
            setIsMyartCreateModalOpen(true);
            setMyartCreateModalMessage("메인골 생성 중 오류가 발생했습니다.");
            //alert("메인골 생성 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6 pt-20">
            <Header title="마이라트 생성하기" page="CreateMyArtPage" />

            <div className="mb-6 w-full">
                <div className="flex justify-end mb-2">
                    <button
                        onClick={cloneButtonClick}
                        className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                    >
                        가져오기
                    </button>
                </div>

                <div className="text-left">
                    {/* ✅ Main Goal 입력 필드 */}
                    <Input
                        type="text"
                        label={"Main Goal 입력"}
                        placeholder="Main Goal을 입력해주세요"
                        value={mainGoal}
                        onChange={(e) => setMainGoal(e.target.value)}
                        required={true}
                    />

                    {/* ✅ Sub Goal 추가 필드 */}
                    <Input
                        type="text"
                        label={"Sub Goal 추가"}
                        placeholder="Sub Goal을 추가해주세요"
                        value={subGoalInput}
                        onChange={(e) => setSubGoalInput(e.target.value)}
                        required={false}
                    >
                        <button
                            type="button"
                            onClick={handleAddSubGoal}
                            className="ml-2 w-16 h-10 text-xs font-normal bg-customMain text-white rounded-md"
                        >
                            추가
                        </button>
                    </Input>

                    {/* ✅ Sub Goal 리스트 */}
                    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-460px)]">
                        {subGoals.map((goal, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center bg-opacity-15 px-4 py-3 rounded-md ${colorClasses[index % colorClasses.length]}`}
                            >
                                <span className="text-sm text-gray-800">{goal}</span>
                                <button
                                    onClick={() => handleDeleteSubGoal(index)}
                                    className="text-red-500 text-xl font-medium"
                                >
                                    ⊖
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* ✅ 최대 개수 경고 */}
                    {subGoals.length >= 8 && (
                        <p className="text-xs text-red-400 mt-2">
                            Sub Goal은 최대 8개까지 추가할 수 있어요.
                        </p>
                    )}
                </div>

                {/* ✅ 완료 버튼 */}
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 max-w-[480px] w-full px-6 z-20">
                    <button
                        className={`w-full bg-customMain py-3 rounded-md shadow-customShadow text-sm font-bold
                            ${mainGoal.trim() === ""
                                ? "bg-gray-200 text-customTextGray cursor-not-allowed"
                                : "bg-customMain text-white"}`}
                        onClick={() => {
                            if (mainGoal.trim() !== "") {
                                createButtonClick();
                            }
                        }}
                        disabled={mainGoal.trim() === ""}
                    >
                        마이라트 생성하기
                    </button>
                </div>


                {/* 마이라트 생성 결과 모달 */}
                {isMyartCreateModalOpen && (
                    <ModalLayout>
                        <h2 className="text-base font-bold mb-5 text-center">마이라트 생성</h2>
                        <p className="text-gray-500 text-sm text-center leading-relaxed">
                            {myartCreateModalMessage}
                        </p>

                        <div className="mt-6 flex items-center justify-center space-x-4">
                            <button
                                className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                                onClick={() => {
                                    setIsMyartCreateModalOpen(false);
                                    if (myartCreateModalMessage.includes("성공")) {
                                        navigate("/myartlist"); // 성공 후 이동
                                    }
                                }}
                            >
                                확인
                            </button>
                        </div>
                    </ModalLayout>
                )}
            </div>
        </div>
    );
}
