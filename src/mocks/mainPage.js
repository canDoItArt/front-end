const mainPageMockData = [
    {
        id: 1,
        mainGoal: {
            id: 1,
            name: "8구단 드래프트 1순위",
            lastWeek: 87,
            thisWeek: 36,
        },
        comment: "앞만 보고 가자, 내 인생에 뒤란 없다.",
        strict: [
            {
                color: "#EB4335",
                checkedDates: ["2024-11-05", "2024-11-07", "2025-01-27"],
            },
            {
                color: "#B1D854",
                checkedDates: ["2024-11-05", "2024-11-10", "2025-01-27"],
            },
            {
                color: "#7BBFF9",
                checkedDates: ["2024-11-05", "2024-11-10", "2025-01-27"],
            },
            {
                color: "#4091EE",
                checkedDates: ["2024-11-05", "2024-11-06", "2024-11-08", "2025-01-27"],
            },
            {
                color: "#8B80DD",
                checkedDates: ["2024-11-05", "2024-11-10", "2025-01-27"],
            },
        ],
        subGoals: [
            { id: 1, name: "구위", color: "#EB4335" },
            { id: 2, name: "제구", color: "#F7D04D" },
            { id: 3, name: "몸 만들기", color: "#B1D854" },
            { id: 4, name: "운", color: "#4091EE" },
            { id: 5, name: "인성", color: "#8B80DD" },
        ],
    },
    {
        id: 2,
        mainGoal: {
            id: 2,
            name: "7구단 드래프트 2순위",
            lastWeek: 64,
            thisWeek: 72,
        },
        comment: "앞만 보고 가자, 내 인생에 뒤란 없다.",
        strict: [
            {
                color: "#EB4335",
                checkedDates: ["2024-11-02", "2024-11-04"],
            },
            {
                color: "#B1D854",
                checkedDates: ["2024-11-02", "2024-11-06"],
            },
            {
                color: "#4091EE",
                checkedDates: ["2024-11-01", "2024-11-03"],
            },
        ],
        subGoals: [
            { id: 1, name: "체력 연습", color: "#EB4335" },
            { id: 2, name: "정확성", color: "#B1D854" },
            { id: 3, name: "민첩성", color: "#4091EE" },
        ],
    },
    {
        id: 3,
        mainGoal: {
            id: 3,
            name: "6구단 드래프트 3순위",
            lastWeek: 55,
            thisWeek: 43,
        },
        comment: "앞만 보고 가자, 내 인생에 뒤란 없다.",
        strict: [
            {
                color: "#F7D04D",
                checkedDates: ["2024-11-08", "2024-11-09"],
            },
            {
                color: "#70CCB1",
                checkedDates: ["2024-11-10", "2024-11-12"],
            },
            {
                color: "#4091EE",
                checkedDates: ["2024-11-11", "2024-11-13"],
            },
        ],
        subGoals: [
            { id: 1, name: "작전 연습", color: "#F7D04D" },
            { id: 2, name: "집중력", color: "#70CCB1" },
            { id: 3, name: "기술 연습", color: "#4091EE" },
        ],
    },
];

export default mainPageMockData;
