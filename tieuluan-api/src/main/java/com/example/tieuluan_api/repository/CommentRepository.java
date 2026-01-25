package com.example.tieuluan_api.repository;

import com.example.tieuluan_api.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
                @Modifying(clearAutomatically = true, flushAutomatically = true)
                @Query(value = "DELETE FROM comment_likes WHERE comment_id = :commentId", nativeQuery = true)
                void deleteByCommentId(@Param("commentId") Integer commentId);
    // Đếm tổng số comment (Thay thế cho countByIsCommentTrue)
    long count();

    // Đếm comment mới sau ngày X (Thay thế cho countByIsReplyTrueAndCreatedAtAfter)
    long countByCreatedAtAfter(LocalDateTime startDate);

    // Đếm comment trong khoảng thời gian
    long countByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);


}
