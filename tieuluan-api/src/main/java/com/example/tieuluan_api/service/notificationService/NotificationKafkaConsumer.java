package com.example.tieuluan_api.service.notificationService;

import com.example.tieuluan_api.dto.NotificationDTO;
import com.example.tieuluan_api.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationKafkaConsumer {
        @Autowired
        NotificationRepository notificationRepository;

        private final SimpMessagingTemplate messagingTemplate;

        @Autowired
        public NotificationKafkaConsumer(SimpMessagingTemplate messagingTemplate) {
            this.messagingTemplate = messagingTemplate;
        }

    @KafkaListener(topics = "notification", groupId = "notification-group")
    public void consumeNotification(NotificationDTO notificationDTO) {
        String recipientEmail = notificationDTO.getRecipient().getEmail();
        messagingTemplate.convertAndSendToUser(
                recipientEmail,
                "/queue/notification",
                notificationDTO
        );

        System.out.println("Đã đẩy thông báo tới: " + recipientEmail);
    }
}
