import React, { useState, useRef } from "react";
import myPageMockData from "../mocks/myPage";
import { BsPersonFill } from "react-icons/bs";
import Header from "../components/Header";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa"; // 카메라 아이콘

export default function EditProfile() {
    const navigate = useNavigate();
    const [currentData] = useState(myPageMockData[0]); // 첫 번째 데이터 사용
    const [previewImage, setPreviewImage] = useState(currentData.profile_imge || null);
    const [nickname, setNickname] = useState(currentData.nickname);
    const [comment, setComment] = useState(currentData.comment);

    const handleDuplicateCheck = (field) => {
        alert(`${field} 중복확인 로직 실행`);
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
                            className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow z-10"
                            onClick={handleProfileClick}
                        >
                            <FaCamera className="text-gray-600 text-lg" />
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
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="사용하실 닉네임을 입력해주세요"
                    required={true} // 필수 항목
                >
                    <div
                        onClick={() => handleDuplicateCheck("닉네임")}
                        className="flex items-center justify-center whitespace-nowrap bg-white border border-customMain text-customMain py-2 px-4 text-xs rounded-md font-bold cursor-pointer"
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
                    value={currentData.email}
                    placeholder=""
                    required={false}
                    readOnly={true}
                />

            </div>
            {/* 저장하기 버튼 */}
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 max-w-[480px] w-full px-6 z-20">
                <button
                    className="w-full bg-customMain text-white py-3 rounded-md shadow-lg text-sm font-bold"
                    onClick={() => navigate(-1)}
                >
                    저장하기
                </button>
            </div>
        </div>
    );
}