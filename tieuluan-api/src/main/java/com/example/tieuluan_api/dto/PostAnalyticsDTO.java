package com.example.tieuluan_api.dto;
import lombok.Data;

@Data
public class PostAnalyticsDTO {
        private long totalPosts;
        private long totalSaves;
        private long totalComments;
        private ChartDataDTO postsOverTimeChart;
        private ChartDataDTO topPostersChart;

}
