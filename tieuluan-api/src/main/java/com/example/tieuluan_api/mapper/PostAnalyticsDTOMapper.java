package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.ChartDataDTO;
import com.example.tieuluan_api.dto.PostAnalyticsDTO;
import com.example.tieuluan_api.entity.User;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class PostAnalyticsDTOMapper {
    public static PostAnalyticsDTO toPostAnalyticsDTO(
            long totalPosts,
            long totalSaves,
            long totalComments,
            ChartDataDTO postsOverTimeChart,
            ChartDataDTO topPostersChart
    ) {

        PostAnalyticsDTO dto = new PostAnalyticsDTO();
        dto.setTotalPosts(totalPosts);
        dto.setTotalSaves(totalSaves);
        dto.setTotalComments(totalComments);
        dto.setPostsOverTimeChart(postsOverTimeChart);
        dto.setTopPostersChart(topPostersChart);

        return dto;
    }

    public static ChartDataDTO createTopPostersChart(Map<User, Long> topTweeters) {
        ChartDataDTO chart = new ChartDataDTO();

        List<String> labels = topTweeters.keySet().stream()
                .map(User::getFullname)
                .collect(Collectors.toList());

        ChartDataDTO.DataSeriesDto series = new ChartDataDTO.DataSeriesDto();
        series.setName("Posts Count");
        series.setData(topTweeters.values().stream()
                .map(Number.class::cast)
                .collect(Collectors.toList()));

        chart.setLabels(labels);
        chart.setSeries(Collections.singletonList(series));

        return chart;

    }
}
