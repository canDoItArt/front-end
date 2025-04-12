import { useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [nickname, setNickname] = useState("");

    const handleDuplicateCheck = (field) => {
        alert(`${field} 중복확인 로직 실행`);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            return;
        }
        console.log("회원가입 시도", { email, password, nickname });
    };

    const isFormValid = email && password && passwordCheck && nickname;

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
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력해주세요"
                                required={true} // 필수 항목
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleDuplicateCheck("이메일")}
                            className="bg-white border border-customMain text-customMain py-2 px-4 text-xs rounded-md font-bold"
                        >
                            중복확인
                        </button>
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
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="사용하실 닉네임을 입력해주세요"
                                required={true} // 필수 항목
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleDuplicateCheck("닉네임")}
                            className="bg-white border border-customMain text-customMain py-2 px-4 text-xs rounded-md font-bold"
                        >
                            중복확인
                        </button>
                    </div>
                </div>

                {/* 회원가입 버튼 */}
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full my-8 py-3 rounded-md shadow-lg text-sm font-bold ${isFormValid
                            ? "bg-customMain text-white"
                            : "bg-gray-200 text-customTextGray cursor-not-allowed"
                        }`}
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}