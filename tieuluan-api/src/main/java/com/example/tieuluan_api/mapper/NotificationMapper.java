package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.NotificationDTO;
import com.example.tieuluan_api.entity.Notification;
import com.example.tieuluan_api.entity.User;

public interface NotificationMapper {
    public static NotificationDTO toNotificationDTO(Notification notification, User reqUser) {
        if (notification == null) {
            return null;
        }
        NotificationDTO dto = new NotificationDTO();
        dto.setId(notification.getId());
        dto.setType(notification.getType());
        dto.setSender(UserMapper.toUserDTO(notification.getSender(), reqUser));
        dto.setRecipient(UserMapper.toUserDTO(notification.getRecipient(), reqUser));
        dto.setContent(notification.getContent());
        dto.setCreatedAt(notification.getCreatedAt());
        return dto;
    }
}
