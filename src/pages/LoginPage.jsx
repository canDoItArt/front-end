import { useEffect, useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../components/ModalLayout";
import api from "../api/axiosInstance"
import { isAccessTokenValid } from "../utils/auth";
import LoginErrorModal from "../components/LoginErrorModal";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showFindPasswordModal, setShowFindPasswordModal] = useState(false);
    const [isLoginErrorModalOpen, setIsLoginErrorModalOpen] = useState(false); // 로그인 에러 모달

    // ✅ 토큰 검사 후 유효하면 자동 이동
    useEffect(() => {
        if (isAccessTokenValid()) {
            navigate("/home");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/api/auth/login", {
                id: email,
                password: password,
            });

            // 1. 헤더에서 accessToken 추출 및 저장
            const accessTokenWithBearer = response.headers["authorization"]; // 또는 소문자 'authorization'
            if (!accessTokenWithBearer) {
                throw new Error("AccessToken이 응답 헤더에 없습니다.");
            }

            const accessToken = accessTokenWithBearer.replace("Bearer ", "");
            localStorage.setItem("accessToken", accessToken);

            // 2. 사용자 정보 저장 (필요한 경우)
            //localStorage.setItem("nickname", response.data.data.nickname);

            // 3. 페이지 이동
            navigate("/home");

        } catch (error) {
            console.error("로그인 실패:", error);
            setIsLoginErrorModalOpen(true);
            //alert("이메일 또는 비밀번호가 올바르지 않습니다.");
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
                        해당 메일로 임시 비밀번호가 발급됩니다.
                    </p>
                    <Input
                        id="find-password-email"
                        label="이메일"
                        type="email"
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
                            onClick={() => setShowFindPasswordModal(false)}
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
