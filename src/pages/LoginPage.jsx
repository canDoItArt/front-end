import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Header from "../components/Header";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../components/ModalLayout";
import LoginErrorModal from "../components/LoginErrorModal";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/axiosInstance";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showCodeVerifiedModal, setShowCodeVerifiedModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [isLoginErrorModalOpen, setIsLoginErrorModalOpen] = useState(false); // 로그인 에러 모달

    const [findEmail, setFindEmail] = useState("");
    const [codeInput, setCodeInput] = useState("");

    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const success = await login(email, password); // ✅ AuthContext의 login 함수만 호출

        if (success) {
            navigate("/home"); // ✅ 성공 시 바로 이동
        } else {
            setIsLoginErrorModalOpen(true);
        }
    };

    const handleSendCode = async () => {
        if (!findEmail) {
            alert("이메일을 입력해주세요.");
            return;
        }

        try {
            const response = await api.post("/api/auth/send-code", { email: findEmail });

            if (response.status === 200) {
                alert("인증코드가 이메일로 발송되었습니다.");
                setIsCodeSent(true);
                //setFindEmail(""); // 입력 초기화
            }
        } catch (error) {
            console.error("인증코드 발송 실패:", error);
            alert("해당 이메일로 가입된 정보가 없습니다. 이메일을 확인해주세요.");
        }
    };

    const handleVerificationCode = async () => {
        if (!setCodeInput) {
            alert("인증코드를 입력해주세요.");
            return;
        }

        try {
            const response = await api.post("/api/auth/verify-code",
                {
                    email: findEmail,
                    code: codeInput,
                });

            if (response.status === 200) {
                alert("인증코드가 확인되었습니다.");
                setIsCodeVerified(true);
            }
        } catch (error) {
            console.error("인증코드 발송 실패:", error);
            alert("인증 코드가 일치하지 않습니다. 인증코드를 다시 확인해주세요.");
        }
    };

    const handleNewPasswordSave = async () => {
        let isValid = true;

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
                // setIsPasswordChangeModalOpen(true);
                // setPasswordChangeModalMessage("비밀번호가 성공적으로 변경되었습니다.");
                // closeModal();
                alert(response.data.message || "비밀번호가 성공적으로 변경되었습니다.");
            } else {
                alert(response.data.message || "비밀번호 변경 실패");
            }
        } catch (error) {
            console.error(error);
            //alert("비밀번호 변경 중 오류가 발생했습니다.");
            //setIsPasswordChangeModalOpen(true);
            //setPasswordChangeModalMessage("비밀번호 변경 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6 pt-20">
            <Header title="로그인" />

            <form onSubmit={handleLogin} className="w-full">
                <Input
                    id="email"
                    label="이메일"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 입력"
                />
                <Input
                    id="password"
                    label="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호 입력"
                />
                <button
                    type="submit"
                    className="w-full bg-customMain mb-8 text-white py-3 rounded-md shadow-customShadow text-sm font-bold"
                >
                    로그인
                </button>
            </form>

            <div className="flex justify-center gap-6 text-sm text-customTextGray">
                <button onClick={() => setShowCodeVerifiedModal(true)}>비밀번호 재설정</button>
            </div>

            {/* 인증 코드 전송 및 확인 모달 */}
            {showCodeVerifiedModal && (
                <ModalLayout onClose={() => setShowCodeVerifiedModal(false)}>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowCodeVerifiedModal(false)}
                            className=" text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <AiOutlineClose size={20} />
                        </button>
                    </div>

                    <h2 className="text-base font-bold mb-5 text-center">인증 코드 전송 및 확인</h2>
                    <p className="text-gray-500 text-sm text-center leading-relaxed">
                        가입한 이메일을 입력하시면<br />
                        해당 메일로 인증 코드가 발급됩니다.
                    </p>

                    <Input
                        id="find-password-email"
                        label="이메일"
                        type="email"
                        value={findEmail}
                        onChange={(e) => setFindEmail(e.target.value)}
                        placeholder="이메일을 입력해주세요"
                        required={false}
                        showTimer={isCodeSent}
                        readOnly={isCodeSent}
                        onTimerExpire={() => setIsCodeSent(false)}
                    >
                        <div
                            onClick={!isCodeSent ? handleSendCode : undefined}
                            className={`flex items-center justify-center whitespace-nowrap py-2 px-4 text-xs rounded-md font-bold cursor-pointer
                                        ${isCodeSent
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-white border border-customMain text-customMain"}`}
                        >
                            코드 전송
                        </div>
                    </Input>

                    <Input
                        id="find-password-email"
                        label="인증 코드"
                        type="text"
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        placeholder="인증코드를 입력해주세요"
                        required={false}
                        readOnly={isCodeVerified}
                    //successMessage={emailChecked ? "중복 확인이 완료되었습니다." : ""}
                    >
                        <div
                            //onClick={handleVerificationCode}
                            onClick={!isCodeVerified ? handleVerificationCode : undefined}
                            className={`flex items-center justify-center whitespace-nowrap py-2 px-4 text-xs rounded-md font-bold cursor-pointer
                                                            ${isCodeVerified
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-white border border-customMain text-customMain"}`}
                        >
                            인증
                        </div>

                    </Input>

                    <div className="mt-6 flex justify-center space-x-4">
                        <button
                            className={`p-3 w-full text-xs font-normal  rounded-md
                                ${isCodeVerified
                                    ? "bg-customMain text-white"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                            onClick={() => {
                                if (isCodeVerified) {
                                    setShowResetPasswordModal(true);
                                    setShowCodeVerifiedModal(false);
                                }
                            }}
                        >
                            비밀번호 재설정
                        </button>
                    </div>
                </ModalLayout>
            )}

            {/* 비밀번호 재설정 모달 */}
            {showResetPasswordModal && (
                <ModalLayout onClose={() => setShowResetPasswordModal(false)}>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowResetPasswordModal(false)}
                            className=" text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <AiOutlineClose size={20} />
                        </button>
                    </div>

                    <h2 className="text-base font-bold mb-5 text-center">비밀번호 재설정</h2>
                    {/* <p className="text-gray-500 text-sm text-center leading-relaxed">
                        가입한 이메일을 입력하시면<br />
                        해당 메일로 인증 코드가 발급됩니다.
                    </p> */}

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

                    {/* <div className="mt-6 flex justify-center space-x-4">
                        <button
                            className="p-2 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
                            onClick={() => setShowResetPasswordModal(false)}
                        >
                            취소
                        </button>
                        <button
                            className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                            onClick={handlePasswordSave}
                        >
                            저장
                        </button>
                    </div> */}
                    <div className="mt-6 flex justify-center space-x-4">
                        <button
                            className="p-3 w-full text-xs font-normal rounded-md bg-customMain text-white"
                            onClick={handleNewPasswordSave}
                        >
                            비밀번호 변경
                        </button>
                    </div>
                </ModalLayout>
            )}

            {/* 로그인 오류 모달 */}
            {isLoginErrorModalOpen && (
                <LoginErrorModal
                    onClose={() => setIsLoginErrorModalOpen(false)} // 혹시나 닫기만 원할 경우
                />
            )}
        </div>
    );
}
