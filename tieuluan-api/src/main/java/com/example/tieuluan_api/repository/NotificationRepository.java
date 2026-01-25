package com.example.tieuluan_api.repository;

import com.example.tieuluan_api.entity.Notification;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    boolean existsBySenderAndRecipientAndContentAndPost(
            User sender,
            User recipient,
            String content,
            Post post
    );
    boolean existsBySenderAndRecipientAndContentAndPostIsNull(
            User sender,
            User recipient,
            String content
    );
    List<Notification> findByRecipientOrderByCreatedAtDesc(User recipient);
}