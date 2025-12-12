package com.example.tieuluan_api.repository;

import com.example.tieuluan_api.entity.Like;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Integer> {
    Optional<Like> findByUserAndPost(User user, Post post);
    void deleteByUserAndPost(User user, Post post);
}