package com.example.tieuluan_api.entity;

import com.example.tieuluan_api.service.notificationService.NotificationType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
public class Notification {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Enumerated(EnumType.STRING)
        private NotificationType type;

        @ManyToOne
        private User sender;

        @ManyToOne
        private User recipient;

        private String content;

        @ManyToOne
        private Post post;

        private LocalDateTime createdAt;


}
