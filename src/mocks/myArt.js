const myArtMockData = [
    {
        comment: "앞만 보고 가자, 내 인생에 뒤란 없다.",
        main_goal_id : 1,
        main_goal_name : "8구단 드래프트 1순위",
        main_goal_status : "ACTIVITY",
        start_date : "2025-06-09",
        end_date : "2025-06-15",
        week_of_month : 2,
        sub_goals: [
            {
                id: 1,
                name: "제구",
                color: "#EB4335", // Red
                is_attained: true,
                progress_rate: 87
            },
            {
                id: 2,
                name: "구위",
                color: "#F09752", // Orange
                is_attained: false,
                progress_rate: 65
            },
            {
                id: 3,
                name: "체력",
                color: "#F7D04D", // Yellow
                is_attained: false,
                progress_rate: 30
            },
            {
                id: 4,
                name: "유연성",
                color: "#B1D854", // Green
                is_attained: false,
                progress_rate: 80
            },
            {
                id: 5,
                name: "멘탈",
                color: "#70CCB1", // Mint
                is_attained: false,
                progress_rate: 20
            },
            {
                id: 6,
                name: "전술 이해",
                color: "#4091EE", // Blue
                is_attained: true,
                progress_rate: 15
            },
        ],
    }
];

export default myArtMockData;
