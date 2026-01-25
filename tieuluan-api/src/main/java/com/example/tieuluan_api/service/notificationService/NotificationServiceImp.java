package com.example.tieuluan_api.service.notificationService;

import com.example.tieuluan_api.dto.NotificationDTO;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Service
public class NotificationServiceImp implements INotificationService{

        private Map<NotificationType, NotificationStrategy> strategyMap;
        @Autowired
        private List<NotificationStrategy> strategies;

        @Autowired
        private KafkaTemplate<String, NotificationDTO> kafkaTemplate;

        @PostConstruct
        public void init() {
            strategyMap = strategies.stream()
                    .collect(Collectors.toMap(NotificationStrategy::getNotificationType, s -> s));
        }

        @Override
        public void sendNotification(NotificationType type, User sender, User recipient, Post post) {
            NotificationStrategy strategy = strategyMap.get(type);
            if(strategy == null) {
                throw new IllegalArgumentException("No strategy found for type " + type);
            }
            NotificationDTO notificationDTO = strategy.handleNotification(sender,recipient,post);
            if(notificationDTO!=null) kafkaTemplate.send("notification", notificationDTO);
        }

}
