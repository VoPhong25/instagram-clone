package com.example.tieuluan_api.repository;

import com.example.tieuluan_api.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Integer> {
    @Query("select s from Story s where s.user.id= :userId")
    List<Story> findAllStoryByUserId(@Param("userId") Integer userId);

}
