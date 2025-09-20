import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoHeader from "../components/LogoHeader";
import Navbar from "../components/Navbar";
import MottoCard from "../components/MottoCard";
import GoalTile from "../components/GoalTile";
import MainGoalList from "../components/MainGoalList";
import CustomDropdown from "../components/CustomDropdown";
import api from "../api/axiosInstance"
import { useAuth } from "../contexts/AuthContext";

export default function MyArtListPage() {
    const [mainGoals, setMainGoals] = useState([]); // state 관리
    const [selectedState, setSelectedState] = useState("all");
    const { user } = useAuth(); // ✅ Context에서 불러오기
    const navigate = useNavigate();
    const [repId, setRepId] = useState(null);

    // 메인골 리스트 조회 API 호출
    useEffect(() => {
        const fetchMainGoals = async () => {
            try {
                const res = await api.get(`/api/main-goals?state=${selectedState}`);
                if (res.data.code === "200") {
                    const goals = res.data.data.mainGoals.map(goal => ({
                        id: goal.id,
                        isRep: goal.isRep ? true : false,
                        name: goal.name,
                        status: goal.status
                    }));
                    setMainGoals(goals);
                }
            } catch (err) {
                console.error("메인골 리스트 조회 실패:", err);
            }
        };

        fetchMainGoals();
    }, [selectedState]); // selectedState 변경될 때마다 재호출

    // 대표 마이라트 설정 함수
    const handleSetRep = (goalIdOrNull) => {
        setMainGoals(prevGoals =>
            prevGoals.map(goal => {
                if (goalIdOrNull === null) {
                    // 대표 해제
                    if (goal.isRep) return { ...goal, isRep: false };
                    return goal;
                }
                if (goal.id === goalIdOrNull) {
                    return { ...goal, isRep: true };
                }
                if (goal.isRep) {
                    return { ...goal, isRep: false }; // 기존 대표 해제
                }
                return goal;
            })
        );
    };



    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
            <LogoHeader />

            <div className="mt-20 w-full">
                <MottoCard motto={user?.comment} />

                {/* ✅ 로딩 중일 때 */}
                {mainGoals.length > 0 ? (
                    <>
                        <div className="mt-4 w-full flex justify-end">
                            <CustomDropdown
                                selectedState={selectedState}
                                setSelectedState={setSelectedState}
                            />
                        </div>

                        <div className="mt-3 p-3 overflow-y-auto max-h-[calc(100vh-320px)]">
                            <ul className="space-y-3">
                                {mainGoals.map((goal) => (
                                    <li key={goal.id}>
                                        <MainGoalList
                                            key={goal.id}
                                            mainGoalId={goal.id}
                                            name={goal.name}
                                            isRep={goal.isRep}
                                            status={goal.status}
                                            onSetRep={handleSetRep}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 max-w-[480px] w-full px-6">
                            <button
                                className="w-full bg-customMain text-white py-3 rounded-md shadow-lg text-sm font-bold"
                                onClick={() => navigate('/createmyart')}
                            >
                                마이라트 생성하기
                            </button>
                        </div>
                    </>

                ) : (
                    selectedState === "all" ? (
                        <div className="flex flex-col items-center">
                            {/* 빈 타일 + 생성 버튼 */}
                            <div className="w-5/6 h-auto grid grid-cols-3 gap-3 justify-items-center items-center p-2 my-3">
                                <GoalTile type="empty" />
                                <GoalTile type="empty" />
                                <GoalTile type="empty" />
                                <GoalTile type="empty" />
                                <button className="w-full" onClick={() => navigate('/createmyart')}>
                                    <div
                                        className={`w-full aspect-[1/1] bg-customMain rounded-xl flex items-center justify-center text-white font-semibold text-sm p-2 
                                    shadow-[0_4px_6px_rgba(0,0,0,0.05),0_-4px_6px_rgba(0,0,0,0.05)]`}
                                    >
                                        <span
                                            className="line-clamp-3 text-center overflow-hidden text-ellipsis whitespace-normal leading-tight break-words"
                                        >
                                            마이라트 <br /> 생성
                                        </span>
                                    </div>
                                </button>
                                <GoalTile type="empty" />
                                <GoalTile type="empty" />
                                <GoalTile type="empty" />
                                <GoalTile type="empty" />
                            </div>
                            <div className="text-center mt-6">
                                <p className="text-customTextBlack font-semibold text-xs mb-1">현재 진행중인 마이라트가 없어요</p>
                                <p className="text-customTextBlack font-semibold text-xs mb-1">
                                    <span className="text-customMain font-bold text-xs">마이라트 생성 버튼</span>을 클릭하여
                                </p>
                                <p className="text-customTextBlack font-semibold text-xs">나만의 만다라트를 만들어보세요!</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mt-4 w-full flex justify-end">
                                <CustomDropdown
                                    selectedState={selectedState}
                                    setSelectedState={setSelectedState}
                                />
                            </div>

                            <div className="flex flex-col items-center justify-center  h-[calc(100vh-320px)]">
                                <p className="text-base text-gray-400">선택한 상태의 마이라트가 없습니다.</p>
                            </div>
                        </>
                    )
                )}
            </div>

            <Navbar initialActiveNav={2} />
        </div>
    );
}
