package com.example.tieuluan_api.service;

import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.PostException;
import com.example.tieuluan_api.exception.UserException;
import jakarta.persistence.PostRemove;

import java.util.List;

public interface IPostService {
    public Post createPost(Post post, Integer userId) throws UserException;
    public String deletePost(Integer postId, Integer userId) throws UserException, PostException;
    public List<Post> findPostByUserId(Integer userId) throws UserException;
    public Post findPostById(Integer postId) throws PostException;
    public List<Post> findAllPostByUserIds(List<Integer> userIds) throws PostException, UserException;
    public String savedPost(Integer postId, Integer userId) throws PostException, UserException;
    public Post likePost(Integer postId, User user) throws UserException, PostException;
}
