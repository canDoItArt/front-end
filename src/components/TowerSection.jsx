import ActivityCalendar from "./ActivityCalendar";

export default function TowerSection({ strict }) {
    return (
        <div className="mt-6 w-full bg-white p-4 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.05),0_-4px_6px_rgba(0,0,0,0.05)]">
            <h3 className="text-base font-bold text-customTextBlack mb-2">한다! 공든 탑이 무너지랴</h3>
            {/* strict 데이터를 ActivityCalendar로 전달 */}
            <ActivityCalendar strict={strict} />
        </div>
    );
}
