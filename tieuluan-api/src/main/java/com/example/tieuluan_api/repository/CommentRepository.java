package com.example.tieuluan_api.repository;

import com.example.tieuluan_api.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
                @Modifying(clearAutomatically = true, flushAutomatically = true)
                @Query(value = "DELETE FROM comment_likes WHERE comment_id = :commentId", nativeQuery = true)
                void deleteByCommentId(@Param("commentId") Integer commentId);



}
