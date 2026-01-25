package com.example.tieuluan_api.dto;

import lombok.Data;

@Data
public class UserAnalyticsDTO {
        private long totalUsers;
        private long newUsers;
        private long activeUsers;
        private ChartDataDTO userGrowthChart;
        private ChartDataDTO mostFollowedUsersChart;
    }

