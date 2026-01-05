package com.example.tieuluan_api.service.DirectMessageService;

import com.example.tieuluan_api.dto.DirectMessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

    @Service
    public class MessageKafkaConsumer {
        private final SimpMessagingTemplate messagingTemplate;
        @Autowired
        public MessageKafkaConsumer(SimpMessagingTemplate template) {
            this.messagingTemplate = template;
        }
        @KafkaListener(topics = "message", groupId = "message-group")
        public void consume(DirectMessageDTO dto){
            System.out.println("Kafka received message");
            System.out.println("Recipient email: " + dto.getRecipient().getEmail());
            messagingTemplate.convertAndSendToUser(
                    dto.getRecipient().getEmail(),
                    "/queue/message",
                    dto
            );
            messagingTemplate.convertAndSendToUser(
                    dto.getSender().getEmail(),
                    "/queue/message",
                    dto
            );
//        System.out.println("Sent message to websocket: "+dto);

    }
}
