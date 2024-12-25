import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // 기본 CSS 스타일
import 'swiper/css/pagination'; // Pagination 스타일
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
            {/* 로고 영역 */}
            <img
                src="/logo_2.png"
                alt="Welcome Logo"
                className="w-32 h-auto mb-8"
            />

            {/* 서비스 소개 영역 */}
            <div className="w-full aspect-[10/13] bg-gray-200 flex items-center justify-center mb-8">
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={20} // 슬라이드 간 간격
                    slidesPerView={1} // 한 번에 표시할 슬라이드 수
                    pagination={{ clickable: true }} // 페이지 네이션 활성화
                    className="w-full h-full"
                >
                    {/* 슬라이드 1 */}
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center h-full">
                            <h3 className="text-xl font-bold text-gray-700">서비스 소개 1</h3>
                            <p className="text-gray-600 mt-2">
                                우리의 서비스를 통해 더 나은 목표 달성이 가능합니다.
                            </p>
                        </div>
                    </SwiperSlide>

                    {/* 슬라이드 2 */}
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center h-full">
                            <h3 className="text-xl font-bold text-gray-700">서비스 소개 2</h3>
                            <p className="text-gray-600 mt-2">
                                함께하는 목표 관리로 동기 부여를 극대화하세요.
                            </p>
                        </div>
                    </SwiperSlide>

                    {/* 슬라이드 3 */}
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center h-full">
                            <h3 className="text-xl font-bold text-gray-700">서비스 소개 3</h3>
                            <p className="text-gray-600 mt-2">
                                편리한 도구로 목표를 계획하고 달성하세요!
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* 로그인 및 회원가입 버튼 영역 */}
            <div className="flex justify-center gap-6 text-sm text-customTextGray">
                <Link to='/signup'>회원가입</Link>
                |
                <Link to='/login'>이메일 로그인</Link>
            </div>
        </div>
    );
}
