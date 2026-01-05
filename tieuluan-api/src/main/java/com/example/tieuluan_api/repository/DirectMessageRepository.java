package com.example.tieuluan_api.repository;

import com.example.tieuluan_api.entity.DirectMessage;
import com.example.tieuluan_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface DirectMessageRepository extends JpaRepository<DirectMessage, Integer> {
    @Query("""
              SELECT m FROM DirectMessage m 
              WHERE (m.sender.id = :me AND m.recipient.id = :other)
                 OR (m.sender.id = :other AND m.recipient.id = :me)
              ORDER BY m.createdAt
            """)
    List<DirectMessage> findConversation(
            @Param("me") Integer me,
            @Param("other") Integer other
    );

    List<DirectMessage> findBySenderOrRecipientOrderByCreatedAtDesc(User sender, User recipient);
}