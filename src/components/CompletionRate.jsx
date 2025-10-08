import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CompletionRate({ lastWeek, thisWeek }) {

    // 원형 그래프 데이터
    const data = (percentage) => {
        // 0%일 때는 아예 회색 원만 보여주기
        if (percentage === 0 || percentage == null) {
            return {
                datasets: [
                    {
                        data: [100],
                        backgroundColor: ["#C2CAF2"],
                        borderWidth: 0,
                    },
                ],
            };
        }

        // 그 외 (1% 이상일 때)
        return {
            datasets: [
                {
                    data: [percentage, 100 - percentage],
                    backgroundColor: ["#8C52FF", "#C2CAF2"],
                    borderWidth: 0,
                },
            ],
        };
    };

    const options = {
        cutout: "70%", // 그래프 중앙을 비워둠
        plugins: {
            tooltip: { enabled: false },
            legend: { display: false },
        },
    };

    console.log("📈 lastWeek:", lastWeek, "thisWeek:", thisWeek);


    return (
        <div className="mt-6 w-full bg-white p-4 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.05),0_-4px_6px_rgba(0,0,0,0.05)]">
            <h3 className="text-base font-bold text-customTextBlack">한다! 달성률</h3>
            <div className="flex justify-evenly mt-4">
                {/* 지난주 달성률 */}
                <div className="relative flex flex-col items-center">
                    <p className="text-xs font-semibold text-customTextBlack mb-2">지난주</p>
                    <div className="relative w-32 h-32">
                        <Doughnut data={data(lastWeek)} options={options} />
                        <p className="absolute inset-0 flex items-center justify-center text-xl font-bold text-customTextPercent">
                            {lastWeek != null ? `${lastWeek}%` : "0%"}
                        </p>
                    </div>
                </div>

                {/* 구분선 */}
                <div className="w-px bg-gray-300 self-stretch" />

                {/* 이번주 달성률 */}
                <div className="relative flex flex-col items-center">
                    <p className="text-xs font-semibold text-customTextBlack mb-2">이번주</p>
                    <div className="relative w-32 h-32">
                        <Doughnut data={data(thisWeek)} options={options} />
                        <p className="absolute inset-0 flex items-center justify-center text-xl font-bold text-customTextPercent">
                            {thisWeek != null ? `${thisWeek}%` : "0%"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
