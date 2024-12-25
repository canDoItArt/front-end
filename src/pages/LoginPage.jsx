import React, { useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("로그인 시도", { email, password });
        // 로그인 처리 로직 추가
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
            {/* Header 컴포넌트 */}
            <Header title="로그인" />

            {/* 로그인 폼 */}
            <form
                onSubmit={handleLogin}
                className="w-full"
            >
                {/* 이메일 입력 */}
                <Input
                    id="email"
                    label="이메일"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 입력"
                />

                {/* 비밀번호 입력 */}
                <Input
                    id="password"
                    label="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호 입력"
                />

                {/* 로그인 버튼 */}
                <button
                    type="submit"
                    className="w-full bg-customMain my-8 text-white py-3 rounded-md shadow-lg text-sm font-bold"
                >
                    로그인
                </button>
            </form>

            {/* 하단 링크 */}
            <div className="flex justify-center gap-6 text-sm text-customTextGray">
                <Link to='/login'>아이디 찾기</Link>
                |
                <Link to='/login'>비밀번호 찾기</Link>
            </div>
        </div>
    );
}
