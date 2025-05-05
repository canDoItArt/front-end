import { BsBell } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function LogoHeader() {

    return (
        <div className="fixed top-0 max-w-[480px] w-full z-10 flex items-center justify-start bg-white px-6 py-4">
            {/* 로고 영역 */}
            <Link to='/home'>
                <img
                    src="/front-end/logo_3.png"
                    alt="Welcome Logo"
                    className="w-28 h-auto"
                />
            </Link>
            {/* 뒤로 가기 버튼 */}
            {/* <Link to='/home'>
                <BsBell className="w-5 h-auto"/>
            </Link> */}
        </div>
    );
}
