package com.example.tieuluan_api.service;

import com.example.tieuluan_api.entity.Story;
import com.example.tieuluan_api.exception.StoryException;
import com.example.tieuluan_api.exception.UserException;

import java.util.List;

public interface IStoryService {
    public Story createStory(Story req, Integer userId) throws UserException;
    public List<Story> findStoryByUserId(Integer userId) throws UserException, StoryException;
}
