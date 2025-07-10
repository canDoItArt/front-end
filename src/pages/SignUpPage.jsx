import { useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import api from "../api/axiosInstance"; // API 인스턴스 임포트
import DuplicateCheckModal from "../components/DuplicateCheckModal";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [nickname, setNickname] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 오픈 상태
    const [modalMessage, setModalMessage] = useState("");  // ✅ 모달에 띄울 메시지

    const [emailChecked, setEmailChecked] = useState(false);
    const [nicknameChecked, setNicknameChecked] = useState(false);


    const handleDuplicateCheck = async (field) => {
        try {
            const value = field === "이메일" ? email : nickname;
            const type = field === "이메일" ? "email" : "nickname";

            if (!value) {
                setModalMessage(`${field}을(를) 입력해주세요.`);
                setIsModalOpen(true);
                return;
            }

            const response = await api.post("/api/members/check", {
                type,
                content: value,
            });

            const isDuplicate = response.data?.data;
            console.log(`[중복확인 응답 - ${field}]`, response);

            if (isDuplicate) {
                setModalMessage(
                    `해당 ${field}은(는) 이미 사용 중인 ${field}입니다. 다른 ${field}을(를) 사용해주세요.`
                );
            } else {
                setModalMessage(`사용 가능한 ${field}입니다.`);
                if (field === "이메일") setEmailChecked(true);
                else setNicknameChecked(true);
            }
            setIsModalOpen(true); // ✅ 모달 열기
        } catch (error) {
            console.error(`${field} 중복 확인 오류`, error);
            setModalMessage(`${field} 중복 확인 중 오류가 발생했습니다.`);
            setIsModalOpen(true);
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            return;
        }
        console.log("회원가입 시도", { email, password, nickname });
    };

    // 모든 조건을 만족할 때만 회원가입 버튼 활성화
    const isFormValid =
        email && nickname &&
        emailChecked && nicknameChecked;


    return (
        <div
            className="flex flex-col items-center justify-between min-h-screen bg-white px-6 relative pt-20"
            onSubmit={handleSignup}
        >
            <Header title="회원가입" />

            <form className="w-full h-full flex-grow flex flex-col justify-between">
                <div className="w-full h-full flex-grow flex flex-col justify-start">
                    {/* 이메일 입력 */}
                    <div className="flex items-center justify-between w-full space-x-4">
                        <div className="flex-grow">
                            <Input
                                id="email"
                                label="이메일"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailChecked(false); // ✅ 이메일이 변경되면 중복 확인 해제
                                }}
                                placeholder="이메일을 입력해주세요"
                                required={true} // 필수 항목
                                successMessage={emailChecked ? "중복 확인이 완료되었습니다." : ""}
                            >
                                <div
                                    onClick={() => {
                                        if (emailChecked) return; // ✅ 중복확인 완료 시 클릭 차단
                                        handleDuplicateCheck("이메일");
                                    }}
                                    className={`flex items-center justify-center whitespace-nowrap py-2 px-4 text-xs rounded-md font-bold cursor-pointer
                                        ${emailChecked
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-white border border-customMain text-customMain"}`}
                                >
                                    중복확인
                                </div>

                            </Input>
                        </div>
                    </div>

                    {/* 비밀번호 입력 */}
                    <Input
                        id="password"
                        label="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력해주세요"
                        required={true} // 필수 항목
                    />

                    {/* 비밀번호 확인 */}
                    <Input
                        id="passwordcheck"
                        label="비밀번호 확인"
                        type="password"
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                        placeholder="비밀번호를 한번 더 입력해주세요"
                        required={true} // 필수 항목
                    />

                    {/* 닉네임 */}
                    <div className="flex items-center justify-between w-full space-x-4">
                        <div className="flex-grow">
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
                                successMessage={nicknameChecked ? "중복 확인이 완료되었습니다." : ""}
                            >
                                <div
                                    onClick={() => {
                                        if (emailChecked) return; // ✅ 중복확인 완료 시 클릭 차단
                                        handleDuplicateCheck("닉네임");
                                    }}
                                    className={`flex items-center justify-center whitespace-nowrap py-2 px-4 text-xs rounded-md font-bold cursor-pointer
                                        ${nicknameChecked
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-white border border-customMain text-customMain"}`}
                                >
                                    중복확인
                                </div>
                            </Input>
                        </div>
                    </div>
                </div>

                {/* 회원가입 버튼 */}
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full my-8 py-3 rounded-md shadow-customShadow text-sm font-bold ${isFormValid
                        ? "bg-customMain text-white"
                        : "bg-gray-200 text-customTextGray cursor-not-allowed"
                        }`}
                >
                    회원가입
                </button>
            </form>

            {/* 중복 확인 모달 */}
            {isModalOpen && (
                <DuplicateCheckModal
                    message={modalMessage}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}