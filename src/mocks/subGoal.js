const subGoalMockData = [
    {
        subGoalName: "제구",
        color: "#EB4335",
        is_achieved: false,
        strict: [
            { checkedDate: "2025-02-04" },
            { checkedDate: "2025-02-07" },
            { checkedDate: "2025-02-08" },
        ],
        dailyActions: [
            { id: 1, target_num: "1", title: "몸관리", content: "아침스트레칭 및 가벼운 운동(1시간)", routine: "3", is_achieved: false },
            { id: 2, target_num: "2", title: "영양제 먹기", content: "매일 아침 7시에 섭취", routine: "5", is_achieved: true },
            { id: 3, target_num: "4", title: "FSQ 90kg", content: "저녁 7시", routine: "2", is_achieved: false },
            { id: 4, target_num: "5", title: "RSQ 130kg", content: "아침스트레칭 및 가벼운 운동(1시간)", routine: "1", is_achieved: false },
            { id: 5, target_num: "6", title: "식사 저녁 7숟갈 아침 3숟갈", content: "아침스트레칭 및 가벼운 운동(1시간)", routine: "4", is_achieved: false },
            { id: 6, target_num: "8", title: "가동역", content: "아침스트레칭 및 가벼운 운동(1시간)", routine: "3", is_achieved: false },
        ]
    },
];

export default subGoalMockData;