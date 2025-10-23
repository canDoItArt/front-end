import { useEffect, useState } from "react";
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

    const [showFindPasswordModal, setShowFindPasswordModal] = useState(false);
    const [isLoginErrorModalOpen, setIsLoginErrorModalOpen] = useState(false); // 로그인 에러 모달

    const [findEmail, setFindEmail] = useState("");

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
                setShowFindPasswordModal(false); // 모달 닫기
                setFindEmail(""); // 입력 초기화
            }
        } catch (error) {
            console.error("인증코드 발송 실패:", error);
            alert("인증코드 발송 중 오류가 발생했습니다. 이메일을 확인해주세요.");
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
                <button onClick={() => setShowFindPasswordModal(true)}>비밀번호 재설정</button>
            </div>

            {/* 비밀번호 찾기 모달 */}
            {showFindPasswordModal && (
                <ModalLayout onClose={() => setShowFindPasswordModal(false)}>
                    <h2 className="text-base font-bold mb-5 text-center">비밀번호 재설정</h2>
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
                        placeholder="이메일 입력"
                        required={false}
                    />

                    <div className="mt-6 flex justify-center space-x-4">
                        <button
                            className="p-2 text-xs font-normal w-24 bg-gray-100 text-gray-400 rounded-md"
                            onClick={() => setShowFindPasswordModal(false)}
                        >
                            취소
                        </button>
                        <button
                            className="p-3 w-24 text-xs font-normal bg-customMain text-white rounded-md"
                            onClick={handleSendCode}
                        >
                            확인
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
