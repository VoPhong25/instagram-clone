package com.example.tieuluan_api.dto;

import lombok.Data;

@Data
public class LikeAnalyticsDTO {
    private long totalLikes;
    private ChartDataDTO likesOverTimeChart;
    private ChartDataDTO mostLikedPostsChart;
    private ChartDataDTO mostActiveLikersChart;
}
