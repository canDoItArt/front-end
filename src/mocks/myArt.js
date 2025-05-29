const myArtMockData = [
    {
        comment: "앞만 보고 가자, 내 인생에 뒤란 없다.",
        mainGoals: {
            id: 1,
            name: "8구단 드래프트 1순위",
            state: "rep"
        },
        subGoals: [
            {
                id: 1,
                name: "제구",
                color: "#EB4335", // Red
                achievement: true,
                strict: [
                    { checkedDate: "2025-02-04" },
                    { checkedDate: "2025-02-07" },
                    { checkedDate: "2025-02-08" },
                ],
            },
            {
                id: 2,
                name: "구위",
                color: "#F09752", // Orange
                achievement: false,
                strict: [
                    { checkedDate: "2025-02-03" },
                    { checkedDate: "2025-02-04" },
                ],
            },
            {
                id: 3,
                name: "체력",
                color: "#F7D04D", // Yellow
                achievement: false,
                strict: [
                    { checkedDate: "2025-02-01" },
                    { checkedDate: "2025-02-05" },
                ],
            },
            {
                id: 4,
                name: "유연성",
                color: "#B1D854", // Green
                achievement: false,
                strict: [
                    { checkedDate: "2025-02-02" },
                    { checkedDate: "2025-02-06" },
                ],
            },
            {
                id: 5,
                name: "멘탈",
                color: "#70CCB1", // Mint
                achievement: false,
                strict: [
                    { checkedDate: "2025-02-03" },
                    { checkedDate: "2025-02-07" },
                ],
            },
            {
                id: 6,
                name: "전술 이해",
                color: "#4091EE", // Blue
                achievement: true,
                strict: [
                    { checkedDate: "2025-02-04" },
                    { checkedDate: "2025-02-08" },
                ],
            },
        ],
    }
];

export default myArtMockData;
