import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../components/ModalLayout";
import Input from "./Input";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/axiosInstance";

export default function SettingsList() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [modalType, setModalType] = useState(null); // 'password', 'logout', 'delete' 등
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [isPasswordCheckModalOpen, setIsPasswordCheckModalOpen] = useState(false); // 현재 비밀번호 확인 모달 오픈 상태
    const [passwordCheckModalMessage, setPasswordCheckModalMessage] = useState("");  // 현재 비밀번호 확인 모달에 띄울 메시지

    const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState(false); // 현재 비밀번호 확인 모달 오픈 상태
    const [passwordChangeModalMessage, setPasswordChangeModalMessage] = useState("");  // 현재 비밀번호 확인 모달에 띄울 메시지

    // 현재 비밀번호 체크여부
    const [passwordChecked, setPasswordChecked] = useState(false);

    const handlePasswordSave = async () => {
        let isValid = true;

        // 현재 비밀번호 유효성 검사
        if (!currentPassword.trim()) {
            setCurrentPasswordError("현재 비밀번호를 입력해주세요.");
            isValid = false;
        } else {
            setCurrentPasswordError("");
        }

        // 새 비밀번호 유효성 검사
        if (!newPassword.trim()) {
            setNewPasswordError("새 비밀번호를 입력해주세요.");
            isValid = false;
        } else {
            setNewPasswordError("");
        }

        // 새 비밀번호 확인 유효성 검사
        if (!confirmPassword.trim()) {
            setConfirmPasswordError("새 비밀번호를 한번 더 입력해주세요.");
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
            isValid = false;
        } else {
            setConfirmPasswordError("");
        }

        if (!isValid) return;

        // 비밀번호 저장 처리 로직 (API 등)
        console.log("비밀번호 변경 완료");

        try {
            // ✅ 비밀번호 변경 API 호출
            const response = await api.patch("/api/members/change-password", {
                newPassword: newPassword,
            });

            if (response.data.code === "200") {
                //alert("비밀번호가 성공적으로 변경되었습니다.");
                setIsPasswordChangeModalOpen(true);
                setPasswordChangeModalMessage("비밀번호가 성공적으로 변경되었습니다.");
                closeModal();
            } else {
                alert(response.data.message || "비밀번호 변경 실패");
            }
        } catch (error) {
            console.error(error);
            //alert("비밀번호 변경 중 오류가 발생했습니다.");
            setIsPasswordChangeModalOpen(true);
            setPasswordChangeModalMessage("비밀번호 변경 중 오류가 발생했습니다.");
        }
    };

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
        setCurrentPasswordError("");
        setNewPasswordError("");
        setConfirmPasswordError("");
        setPasswordChecked(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    // 현재 비밀번호 확인 API
    const passwordCheck = async () => {
        try {
            const response = await api.post("/api/members/password-check", {
                type: "new-password",
                password: currentPassword,
            });

            if (response.data.code === "200") {
                setPasswordChecked(true);
                setIsPasswordCheckModalOpen(true);
                setPasswordCheckModalMessage("비밀번호가 확인되었습니다.");
                // TODO: 비밀번호 변경 input 활성화 로직 추가 가능
            } else {
                alert(response.data.message || "비밀번호 확인 실패");
            }
        } catch (error) {
            console.error(error);
            setIsPasswordCheckModalOpen(true);
            setPasswordCheckModalMessage("비밀번호가 일치하지 않습니다.");
        }
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

                    <Input
                        id="password"
                        label="현재 비밀번호 확인"
                        type="password"
                        placeholder="현재 비밀번호를 입력해주세요"
                        value={currentPassword}
                        onChange={
                            passwordChecked
                                ? undefined // ✅ 확인 완료되면 입력 막기
                                : (e) => setCurrentPassword(e.target.value)
                        }
                        required={false}
                        error={currentPasswordError}
                        successMessage={passwordChecked ? "비밀번호가 확인되었습니다." : ""}
                        disabled={passwordChecked}
                    >
                        <button
                            className={`flex items-center justify-center whitespace-nowrap py-2 px-4 text-xs rounded-md font-bold cursor-pointer
                                        ${passwordChecked
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-white border border-customMain text-customMain"}`}
                            onClick={passwordCheck}
                            disabled={passwordChecked}
                        >
                            확인
                        </button>
                    </Input>

                    <Input
                        id="password"
                        label="새 비밀번호"
                        type="password"
                        placeholder="새 비밀번호를 입력해주세요"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required={false}
                        error={newPasswordError}
                    />

                    <Input
                        id="password"
                        label="새 비밀번호 확인"
                        type="password"
                        placeholder="새 비밀번호를 한번 더 입력해주세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={false}
                        error={confirmPasswordError}
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
                            onClick={handlePasswordSave}
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
                            onClick={async () => {
                                console.log("로그아웃 실행");
                                await logout();
                                closeModal();
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

            {/* 비밀번호 확인 성공 및 실패 메시지 모달 */}
            {isPasswordCheckModalOpen && (
                <ModalLayout>
                    <h2 className="text-base font-bold mb-5 text-center">
                        현재 비밀번호 확인
                    </h2>
                    <p className="text-gray-500 text-sm text-center leading-relaxed">
                        {passwordCheckModalMessage}
                    </p>

                    <div className="mt-6 flex items-center justify-center space-x-4">
                        <button
                            className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                            onClick={() => {
                                setIsPasswordCheckModalOpen(false);
                            }}
                        >
                            확인
                        </button>
                    </div>
                </ModalLayout>
            )}

            {/* 비밀번호 변경 성공 및 실패 메시지 모달 */}
            {isPasswordChangeModalOpen && (
                <ModalLayout>
                    <h2 className="text-base font-bold mb-5 text-center">
                        비밀번호 변경
                    </h2>
                    <p className="text-gray-500 text-sm text-center leading-relaxed">
                        {passwordChangeModalMessage}
                    </p>

                    <div className="mt-6 flex items-center justify-center space-x-4">
                        <button
                            className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                            onClick={() => {
                                setIsPasswordChangeModalOpen(false);
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
