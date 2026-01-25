package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.ChartDataDTO;
import com.example.tieuluan_api.dto.UserAnalyticsDTO;
import com.example.tieuluan_api.entity.User;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class UserAnalyticsDTOMapper {
        public static UserAnalyticsDTO toUserAnalyticsDTO(
                long totalUsers,
                long newUsers,
                long activeUsers,
                ChartDataDTO userGrowthChart,
                ChartDataDTO mostFollowedUsersChart) {

            UserAnalyticsDTO dto = new UserAnalyticsDTO();
            dto.setTotalUsers(totalUsers);
            dto.setNewUsers(newUsers);
            dto.setActiveUsers(activeUsers);
            dto.setUserGrowthChart(userGrowthChart);
            dto.setMostFollowedUsersChart(mostFollowedUsersChart);

            return dto;
        }
        public static ChartDataDTO createMostFollowedUsersChart(Map<User, Integer> mostFollowedUsers) {
            ChartDataDTO chart = new ChartDataDTO();

            List<String> labels = mostFollowedUsers.keySet().stream()
                    .map(User::getFullname)
                    .collect(Collectors.toList());

            ChartDataDTO.DataSeriesDto series = new ChartDataDTO.DataSeriesDto();
            series.setName("Followers");
            series.setData(mostFollowedUsers.values().stream()
                    .map(Number.class::cast)
                    .collect(Collectors.toList()));

            chart.setLabels(labels);
            chart.setSeries(Collections.singletonList(series));

            return chart;

    }
}
