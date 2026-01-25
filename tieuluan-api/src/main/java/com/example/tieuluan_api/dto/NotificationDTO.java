package com.example.tieuluan_api.dto;

import com.example.tieuluan_api.service.notificationService.NotificationType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationDTO {
        private Integer id;
        private NotificationType type;
        private UserDTO sender;
        private UserDTO recipient;
        private String content;
        private PostDTO post;
        private LocalDateTime createdAt;

}
