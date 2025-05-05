import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../components/ModalLayout";
import Input from "./Input";

export default function SettingsList() {
    const navigate = useNavigate();
    const [modalType, setModalType] = useState(null); // 'password', 'logout', 'delete' 등

    const options = [
        "회원 정보 수정",
        "비밀번호 변경",
        "로그아웃",
        "계정 삭제",
    ];

    const handleClick = (option) => {
        switch (option) {
            case "회원 정보 수정":
                navigate('/editprofile');
                break;
            case "비밀번호 변경":
                setModalType("password");
                break;
            case "로그아웃":
                setModalType("logout");
                break;
            case "계정 삭제":
                setModalType("delete");
                break;
            default:
                console.log("알 수 없는 항목");
        }
    };

    const closeModal = () => {
        setModalType(null);
    };

    const passwordCheck = () => {
        alert("비밀번호 확인");
    };

    return (
        <div className="w-full mt-4">
            {options.map((option, index) => (
                <div
                    key={index}
                    onClick={() => handleClick(option)}
                    className="border-b-0.1 py-4 px-3 font-medium text-sm text-customTextBlack cursor-pointer"
                >
                    {option}
                </div>
            ))}

            {/* 비밀번호 변경 모달 */}
            {modalType === "password" && (
                <ModalLayout onClose={closeModal}>
                    <h2 className="text-base font-bold mb-5 text-center">비밀번호 변경</h2>
                    {/* <p className="text-gray-500 text-sm text-center leading-relaxed">
                        변경을 원하신다면 현재 비밀번호와<br />
                        변경하실 비밀번호를 입력해주세요.
                    </p> */}

                    <Input
                        id="password"
                        label="현재 비밀번호 확인"
                        type="password"
                        placeholder="현재 비밀번호를 입력해주세요"
                        required={false}
                    >
                        <button
                            className="flex items-center justify-center whitespace-nowrap bg-white border border-customMain text-customMain py-2 px-4 text-xs rounded-md font-bold cursor-pointer"
                            onClick={passwordCheck}
                        >
                            확인
                        </button>
                    </Input>

                    <Input
                        id="password"
                        label="새 비밀번호"
                        type="password"
                        placeholder="새 비밀번호를 입력해주세요"
                        required={false}
                    />

                    <Input
                        id="password"
                        label="새 비밀번호 확인"
                        type="password"
                        placeholder="새 비밀번호를 한번 더 입력해주세요"
                        required={false}
                    />

                    <div className="mt-6 flex justify-center space-x-4">
                        <button
                            className="p-2 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
                            onClick={closeModal}
                        >
                            취소
                        </button>
                        <button
                            className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            저장
                        </button>
                    </div>
                </ModalLayout>
            )}

            {/* 로그아웃 모달 */}
            {modalType === "logout" && (
                <ModalLayout onClose={closeModal}>
                    <h2 className="text-base font-bold mb-5 text-center">로그아웃</h2>
                    <p className="text-gray-500 text-sm text-center leading-relaxed">
                        로그아웃 하시겠습니까?
                    </p>

                    <div className="mt-6 flex justify-center space-x-4">
                        <button
                            className="p-2 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
                            onClick={closeModal}
                        >
                            취소
                        </button>
                        <button
                            className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                            onClick={() => {
                                console.log("로그아웃 실행");
                                closeModal();
                                navigate('/');
                            }}
                        >
                            로그아웃
                        </button>
                    </div>
                </ModalLayout>
            )}

            {/* 계정 삭제 모달 */}
            {modalType === "delete" && (
                <ModalLayout onClose={closeModal}>
                    <h2 className="text-base font-bold mb-5 text-center">계정 삭제</h2>
                    <p className="text-gray-500 text-sm text-center leading-relaxed">
                        계정을 삭제하면 모든 정보가 사라집니다. <br />
                        삭제를 원하신다면 비밀번호를 입력해주세요.
                    </p>

                    <Input
                        id="password"
                        label="현재 비밀번호 확인"
                        type="password"
                        placeholder="현재 비밀번호를 입력해주세요"
                        required={false}
                    />

                    <div className="mt-6 flex justify-center space-x-4">
                        <button
                            className="p-2 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
                            onClick={closeModal}
                        >
                            취소
                        </button>
                        <button
                            className="p-3 w-24 text-xs font-normal bg-red-500 text-white rounded-md"
                            onClick={() => {
                                closeModal();
                                navigate('/');
                            }}
                        >
                            삭제
                        </button>
                    </div>
                </ModalLayout>
            )}
        </div>
    );
}
