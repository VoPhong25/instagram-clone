package com.example.tieuluan_api.repository;

import com.example.tieuluan_api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query("select p from Post p where p.user.id=?1 order by p.createdAt DESC")
    public List<Post> findByUserId(Integer userId);
    @Query("select p from Post p where p.user.id in :users order by p.createdAt DESC")
    public List<Post> findAllPostByuserIds(@Param("users") List<Integer> userIds);


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM comment_likes WHERE comment_id IN " +
            "(SELECT id FROM comment WHERE post_id = :postId)",
            nativeQuery = true)
    void deleteByPostId(@Param("postId") Integer postId);
    long countByCreatedAtAfter(LocalDateTime startDate);
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    List<Post> findByCreatedAtAfter(LocalDateTime start);

}
