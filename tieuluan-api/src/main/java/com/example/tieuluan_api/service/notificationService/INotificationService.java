package com.example.tieuluan_api.service.notificationService;

import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;

public interface INotificationService {
    void sendNotification(NotificationType type, User sender, User recipient, Post post);

}
