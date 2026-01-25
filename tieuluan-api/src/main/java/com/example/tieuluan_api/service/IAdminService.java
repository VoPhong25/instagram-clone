package com.example.tieuluan_api.service;

import com.example.tieuluan_api.dto.*;

import java.util.List;

public interface IAdminService {
    DashboardAnalyticsDTO getDashboardAnalytics();

    PostAnalyticsDTO getPostAnalytics();

    LikeAnalyticsDTO getLikeAnalytics();

    UserAnalyticsDTO getUserAnalytics();

    List<UserDTO> getAllUsers(String query, int page, int size);

    UserDTO banUser(Integer userId, String reason);

    UserDTO unbanUser(Integer userId);
}
