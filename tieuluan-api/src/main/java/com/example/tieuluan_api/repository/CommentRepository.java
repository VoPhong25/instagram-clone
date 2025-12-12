package com.example.tieuluan_api.repository;

import com.example.tieuluan_api.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
