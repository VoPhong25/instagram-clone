package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.ChartDataDTO;
import com.example.tieuluan_api.dto.LikeAnalyticsDTO;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class LikeAnalyticsDTOMapper {
        public static LikeAnalyticsDTO toLikeAnalyticsDTO(
                long totalLikes,
                ChartDataDTO likesOverTimeChart,
                ChartDataDTO mostLikedPostsChart,
                ChartDataDTO mostActiveLikersChart) {

            LikeAnalyticsDTO dto = new LikeAnalyticsDTO();
            dto.setTotalLikes(totalLikes);
            dto.setLikesOverTimeChart(likesOverTimeChart);
            dto.setMostLikedPostsChart(mostLikedPostsChart);
            dto.setMostActiveLikersChart(mostActiveLikersChart);

            return dto;
        }

        public static ChartDataDTO createMostLikedPostsChart(Map<Post, Long> mostLikedTweets) {
            ChartDataDTO chart = new ChartDataDTO();

            List<String> labels = mostLikedTweets.keySet().stream()
                    .map(t -> t.getCaption().length() > 30 ?
                            t.getCaption().substring(0, 27) + "..." :
                            t.getCaption())
                    .collect(Collectors.toList());

            ChartDataDTO.DataSeriesDto series = new ChartDataDTO.DataSeriesDto();
            series.setName("Like Count");
            series.setData(mostLikedTweets.values().stream()
                    .map(Number.class::cast)
                    .collect(Collectors.toList()));

            chart.setLabels(labels);
            chart.setSeries(Collections.singletonList(series));

            return chart;
        }

        /**
         * Creates a chart of most active likers
         */
        public static ChartDataDTO createMostActiveLikersChart(Map<User, Long> mostActiveLikers) {
            ChartDataDTO chart = new ChartDataDTO();

            List<String> labels = mostActiveLikers.keySet().stream()
                    .map(User::getFullname)
                    .collect(Collectors.toList());

            ChartDataDTO.DataSeriesDto series = new ChartDataDTO.DataSeriesDto();
            series.setName("Likes Given");
            series.setData(mostActiveLikers.values().stream()
                    .map(Number.class::cast)
                    .collect(Collectors.toList()));

            chart.setLabels(labels);
            chart.setSeries(Collections.singletonList(series));

            return chart;

    }
}
