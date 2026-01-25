package com.example.tieuluan_api.service.notificationService;

import com.example.tieuluan_api.dto.NotificationDTO;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;

public interface NotificationStrategy {
    NotificationType getNotificationType();
    NotificationDTO handleNotification(User sender, User recipient, Post post);
}