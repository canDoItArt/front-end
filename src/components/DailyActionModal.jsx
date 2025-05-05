import dailyActionListMockData from "../mocks/dailyActionList";
import DailyActionCheck from "./DailyActionCheck";
import ModalLayout from "./ModalLayout"; // ✅ ModalLayout 추가

export default function DailyActionModal({ isOpen, onClose, goal }) {
    if (!isOpen) return null;

    // Find the matching sub_goal_name in the mock data
    const goalData = dailyActionListMockData.find(item => item.sub_goal_name === goal.name);

    return (
        <ModalLayout onClose={onClose}> {/* ✅ ModalLayout 적용 */}
            <h2 className="text-base font-bold mb-4 text-center">{goal.name}</h2>

            {/* 스크롤 가능한 영역 (내용이 많을 때만 스크롤) */}
            <div className="flex-1 overflow-y-auto max-h-[60vh]">
                {goalData?.daily_actions && goalData.daily_actions.length > 0 ? (
                    goalData.daily_actions.map((action) => (
                        <DailyActionCheck
                            key={action.daily_action_id}
                            daily_action_id={action.daily_action_id}
                            daily_action_title={action.daily_action_title}
                            daily_action_content={action.daily_action_content}
                            checked_dates={action.checked_dates}
                            sub_goal_color={goalData.sub_goal_color}
                        />
                    ))
                ) : (
                    <div className="text-base text-center text-gray-600 py-6">
                        데일리 액션이 존재하지 않습니다<br/>
                    </div>
                )}
            </div>

            {/* 저장 버튼 */}
            <div className="mt-4 flex justify-center">
                <button
                    type="submit"
                    className="w-auto bg-customMain text-white py-3 px-5 rounded-md shadow-lg text-xs font-semibold"
                    onClick={onClose} // ✅ Modal 닫기
                >
                    저장
                </button>
            </div>
        </ModalLayout>
    );
}
