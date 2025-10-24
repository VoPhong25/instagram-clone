package com.example.tieuluan_api.service;

import com.example.tieuluan_api.dto.request.UserCreateReq;
import com.example.tieuluan_api.dto.request.UserUpdateReq;
import com.example.tieuluan_api.dto.response.UserCreateResponse;
import com.example.tieuluan_api.dto.response.UserUpdateResponse;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;

import java.util.List;

public interface IUserService {
    public UserCreateResponse registerUser(UserCreateReq req) throws UserException;
    public User findUserById(Integer userId) throws UserException;
    public User findUserProfile(String token) throws UserException;
    public User findUserByUsername(String username) throws UserException;
    public  String followUser(Integer reqUserId, Integer followUserId) throws UserException;
    public String unFollowUser(Integer reqUserId, Integer followUserId) throws UserException;
    public List<User> findUsersByIds(List<Integer> userId) throws UserException;
    public List<User> searchUsers(String query) throws UserException;
    public UserUpdateResponse updateUserDetails(Integer targetUserId, Integer currentUserId, UserUpdateReq req) throws UserException;

}
