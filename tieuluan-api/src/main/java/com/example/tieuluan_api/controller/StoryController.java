package com.example.tieuluan_api.controller;

import com.example.tieuluan_api.dto.StoryDTO;
import com.example.tieuluan_api.entity.Story;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.StoryException;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.mapper.StoryMapper;
import com.example.tieuluan_api.service.IStoryService;
import com.example.tieuluan_api.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/story")
public class StoryController {
    @Autowired
    private IUserService userService;
    @Autowired
    private IStoryService storyService;

    @PostMapping("/create")
    public ResponseEntity<StoryDTO> createStory(@RequestBody Story req, @RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findUserProfile(token);
        Story story = storyService.createStory(req, user.getId());
        StoryDTO storyDTO = StoryMapper.toDTO(story, user);
        return new ResponseEntity<>(storyDTO, HttpStatus.CREATED);
    }
    @GetMapping("/getAll/{userId}")
    public ResponseEntity<List<StoryDTO>> findAllStoryByUserId(@PathVariable Integer userId) throws UserException, StoryException {
        User user = userService.findUserById(userId);
    List<Story> stories = storyService.findStoryByUserId(user.getId());
    List<StoryDTO> storyDTOS = StoryMapper.toDtoList(stories, user);
    return new ResponseEntity<>(storyDTOS, HttpStatus.OK);
    }
}
