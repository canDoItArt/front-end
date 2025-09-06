import React, { useState, useRef } from "react";
import myPageMockData from "../mocks/myPage";
import { BsPersonFill } from "react-icons/bs";
import Header from "../components/Header";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa"; // 카메라 아이콘
import api from "../api/axiosInstance";
import DuplicateCheckModal from "../components/DuplicateCheckModal";
import { useAuth } from "../contexts/AuthContext";  // AuthContext 가져오기
import ModalLayout from "../components/ModalLayout";

export default function EditProfilePage() {
    const navigate = useNavigate();
    const { user, loading, fetchUser } = useAuth(); // Context에서 불러오기
    // const [currentData] = useState(myPageMockData[0]); // 첫 번째 데이터 사용
    const [previewImage, setPreviewImage] = useState(user.profileImage || null);
    const [nickname, setNickname] = useState(user?.nickname);
    const [comment, setComment] = useState(user?.comment);

    // 닉네임 중복 체크
    const [nicknameChecked, setNicknameChecked] = useState(false);

    // 원래 닉네임 저장
    const originalNickname = user?.nickname;

    const [isDuplicateCheckModalOpen, setIsDuplicateCheckModalOpen] = useState(false); // 중복 확인 모달 오픈 상태
    const [duplicateCheckModalMessage, setDuplicateCheckModalMessage] = useState("");  // 중복 확인 모달에 띄울 메시지

    const [isEditResultModalOpen, setIsEditResultModalOpen] = useState(false); // 수정 완료 시 모달 오픈 상태
    const [editResultModalMessage, setEditResultModalMessage] = useState("");  // 수정 완료 시 모달에 띄울 메시지

    const handleSave = async () => {
        try {
            const response = await api.patch("/api/members", {
                profileImage: previewImage ?? null,
                nickname,
                comment,
                email: user?.email,
            });
            console.log("✅ 수정 성공:", response.data);
            setEditResultModalMessage("수정이 완료되었습니다.");
            await fetchUser(); // ✅ 최신 사용자 정보 다시 불러오기
            setIsEditResultModalOpen(true); // ✅ 모달 열기
        } catch (err) {
            console.error("❌ 수정 실패:", err.response?.data || err.message);
            setEditResultModalMessage("회원 정보 수정에 실패했습니다.");
            setIsEditResultModalOpen(true); // ✅ 실패 시에도 모달 열기
        }
    };

    const handleDuplicateCheck = async () => {
        try {
            const value = nickname;
            const type = "nickname";

            if (!value) {
                setDuplicateCheckModalMessage("닉네임을 입력해주세요.");
                setIsDuplicateCheckModalOpen(true);
                return;
            }

            const response = await api.post("/api/members/check", {
                type,
                content: value,
            });

            const isDuplicate = response.data?.data;
            console.log("[중복확인 응답 - 닉네임]", response);

            if (isDuplicate) {
                setDuplicateCheckModalMessage(
                    "해당 닉네임은 이미 사용 중인 닉네임입니다."
                );
            } else {
                setDuplicateCheckModalMessage("사용 가능한 닉네임입니다.");
                setNicknameChecked(true);
            }
            setIsDuplicateCheckModalOpen(true); // ✅ 모달 열기
        } catch (error) {
            console.error("닉네임 중복 확인 오류", error);
            setDuplicateCheckModalMessage(`닉네임 중복 확인 중 오류가 발생했습니다.`);
            setIsDuplicateCheckModalOpen(true);
        }
    };


    const fileInputRef = useRef(null);

    const handleProfileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("이미지 파일만 업로드할 수 있습니다.");
        }
    };


    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
            {/* LogoHeader 컴포넌트 */}
            <Header title="회원 정보 수정" />

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-24 w-full">

                {/* 프로필 영역 */}
                <div className="my-6 w-full flex flex-col items-center">
                    <div className="relative w-28 h-28 cursor-pointer">
                        <div
                            className="w-full h-full rounded-full overflow-hidden"
                            onClick={handleProfileClick}
                        >
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <BsPersonFill className="text-8xl text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div
                            className="absolute bottom-0 right-0 translate-x-[-6px] bg-white p-1 rounded-full shadow z-10"
                            onClick={handleProfileClick}
                        >
                            <FaCamera className="text-gray-600 text-sm" />
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                </div>


                <Input
                    id="nickname"
                    label="닉네임"
                    type="text"
                    value={nickname}
                    onChange={(e) => {
                        setNickname(e.target.value);
                        setNicknameChecked(false); // ✅ 닉네임이 변경되면 중복 확인 해제
                    }}
                    placeholder="사용하실 닉네임을 입력해주세요"
                    required={true} // 필수 항목
                >
                    <div
                        onClick={() => {
                            if (nicknameChecked || nickname === originalNickname) return; // ✅ 중복확인 완료 시 클릭 차단
                            handleDuplicateCheck();
                        }}
                        className={`flex items-center justify-center whitespace-nowrap py-2 px-4 text-xs rounded-md font-bold cursor-pointer
                                        ${nicknameChecked || nickname === originalNickname
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white border border-customMain text-customMain"}`}
                    >
                        중복확인
                    </div>
                </Input>

                <Input
                    id="comment"
                    label="좌우명"
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="좌우명을 입력해주세요"
                    required={false} // 필수 항목
                />

                <Input
                    id="email"
                    label="이메일"
                    type="text"
                    value={user?.email} s
                    placeholder=""
                    required={false}
                    readOnly={true}
                />
            </div>

            {/* 저장하기 버튼 */}
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 max-w-[480px] w-full px-6 z-20">
                <button
                    disabled={nickname !== originalNickname && !nicknameChecked}
                    className={`w-full py-3 rounded-md shadow-customShadow text-sm font-bold
                        ${nickname !== originalNickname && !nicknameChecked
                            ? "bg-gray-200 text-customTextGray cursor-not-allowed"
                            : "bg-customMain text-white"
                        }`}
                    onClick={handleSave}
                >
                    저장하기
                </button>
            </div>

            {/* 중복 확인 모달 */}
            {isDuplicateCheckModalOpen && (
                <DuplicateCheckModal
                    message={duplicateCheckModalMessage}
                    onClose={() => setIsDuplicateCheckModalOpen(false)}
                />
            )}

            {/* 회원정보 수정 성공 및 실패 메시지 모달 */}
            {isEditResultModalOpen && (
                <ModalLayout>
                    <h2 className="text-base font-bold mb-5 text-center">
                        {editResultModalMessage.includes("실패") ? "수정 실패" : "수정 완료"}
                    </h2>
                    <p className="text-gray-500 text-sm text-center leading-relaxed">
                        {editResultModalMessage}
                    </p>

                    <div className="mt-6 flex items-center justify-center space-x-4">
                        <button
                            className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                            onClick={() => {
                                setIsEditResultModalOpen(false);
                                if (!editResultModalMessage.includes("실패")) {
                                    navigate(-1); // ✅ 성공일 때만 마이페이지 이동
                                }
                            }}
                        >
                            확인
                        </button>
                    </div>
                </ModalLayout>
            )}
        </div>
    );
}