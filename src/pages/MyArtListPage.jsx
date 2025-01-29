import LogoHeader from "../components/LogoHeader";
import Navbar from "../components/Navbar";

export default function MyArtListPage() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
            {/* LogoHeader 컴포넌트 */}
            <LogoHeader />

            {/* 메인 콘텐츠 영역 */}
            <div className="mt-20 mb-24 w-full">
                
            </div>

            {/* 네비게이션바 */}
            <Navbar initialActiveNav={2} />
        </div>
    );
}