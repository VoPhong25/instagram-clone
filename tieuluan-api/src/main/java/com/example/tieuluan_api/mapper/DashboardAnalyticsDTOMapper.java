package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.ChartDataDTO;
import com.example.tieuluan_api.dto.DashboardAnalyticsDTO;

public class DashboardAnalyticsDTOMapper {
    public static DashboardAnalyticsDTO toDashboardAnalyticsDTO(
            long totalUsers,
            long newUsers,
            long totalPosts,
            long totalLikes,
            long totalSaves,
            long totalComments,
            ChartDataDTO userGrowthChart,
            ChartDataDTO activityChart) {

        DashboardAnalyticsDTO dto = new DashboardAnalyticsDTO();
        dto.setTotalUsers(totalUsers);
        dto.setNewUsers(newUsers);
        dto.setTotalPosts(totalPosts);
        dto.setTotalLikes(totalLikes);
        dto.setTotalSaves(totalSaves);
        dto.setTotalComments(totalComments);
        dto.setUserGrowthChart(userGrowthChart);
        dto.setActivityChart(activityChart);
        return dto;
    }

}
