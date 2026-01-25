package com.example.tieuluan_api.dto;
import lombok.Data;

@Data
public class DashboardAnalyticsDTO {
        private long totalUsers;
        private long newUsers;
        private long totalPosts;
        private long totalLikes;
        private long totalSaves;
        private long totalComments;
        private ChartDataDTO userGrowthChart;
        private ChartDataDTO activityChart;

}
