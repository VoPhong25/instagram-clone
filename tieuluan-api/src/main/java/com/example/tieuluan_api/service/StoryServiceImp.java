package com.example.tieuluan_api.service;

import com.example.tieuluan_api.entity.Story;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.StoryException;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.repository.StoryRepository;
import com.example.tieuluan_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImp implements IStoryService{
    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private IUserService userService;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Story createStory(Story req, Integer userId) throws UserException {
        User user = userService.findUserById(userId);
        Story story = new Story();
        story.setUser(user);
        story.setCaption(req.getCaption());
        story.setImage(req.getImage());
        story.setTimestamp(LocalDateTime.now());
        user.getStories().add(story);

        return storyRepository.save(story);
    }

    @Override
    public List<Story> findStoryByUserId(Integer userId) throws UserException, StoryException {
        User user = userService.findUserById(userId);
        if (user == null){
            throw new UserException("User not found with id: " + userId);
        }
        List<Story> storyList = storyRepository.findAllStoryByUserId(user.getId());
        if(storyList.size()==0)
            throw new StoryException("This user doesn't have any story");
        return storyList;
    }
}
