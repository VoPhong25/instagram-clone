package com.example.tieuluan_api.service.notificationService;


import com.example.tieuluan_api.dto.NotificationDTO;
import com.example.tieuluan_api.entity.Notification;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.mapper.NotificationMapper;
import com.example.tieuluan_api.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LikeNotificationStrategy implements NotificationStrategy {
    @Autowired
    NotificationRepository notificationRepository;
    @Override
    public NotificationType getNotificationType() {
        return NotificationType.LIKE;
    }

    @Override
    public NotificationDTO handleNotification(User sender, User recipient, Post post) {
        Notification notification = new Notification();
        notification.setType(NotificationType.LIKE);
        notification.setSender(sender);
        notification.setRecipient(recipient);
        String content=" liked your post";
        notification.setContent(content);
        notification.setPost(post);
        notification.setCreatedAt(LocalDateTime.now());
        if (notificationRepository.existsBySenderAndRecipientAndContentAndPost(sender,recipient,content,post)) return null;
        notificationRepository.save(notification);
        return NotificationMapper.toNotificationDTO(notification, sender);
    }
}