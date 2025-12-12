package com.example.tieuluan_api.repository;

import com.example.tieuluan_api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query("select p from Post p where p.user.id=?1")
    public List<Post> findByUserId(Integer userId);
    @Query("select p from Post p where p.user.id in :users order by p.createdAt DESC")
    public List<Post> findAllPostByuserIds(@Param("users") List<Integer> userIds);

}
