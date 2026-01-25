package com.example.tieuluan_api.service;

import com.example.tieuluan_api.dto.request.ChangePasswordRequest;
import com.example.tieuluan_api.dto.request.UserCreateReq;
import com.example.tieuluan_api.dto.request.UserUpdateReq;
import com.example.tieuluan_api.dto.response.UserCreateResponse;
import com.example.tieuluan_api.dto.response.UserFollowResponse;
import com.example.tieuluan_api.dto.response.UserUpdateResponse;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface IUserService {

    public User findUserById(Integer userId) throws UserException;
    public User findUserProfile(String token) throws UserException;
    public User findUserByUsername(String username) throws UserException;
    public User followUser(Integer reqUserId, Integer followUserId) throws UserException;
    public List<User> findUsersByIds(List<Integer> userId) throws UserException;
    public List<User> searchUsers(String query) throws UserException;
    public UserUpdateResponse updateUserDetails(Integer userReq, UserUpdateReq req) throws UserException;
    public String removeAvt(Integer userId) throws UserException;

    public Page<UserFollowResponse> findFollowersOf(Integer id, Pageable pageable);

    // User {id} đang theo dõi ai

    public Page<UserFollowResponse> findFollowingOf(Integer id, Pageable pageable);

    // hien thi so luong nguoi theo doi user {id}

    public Map<String, Long> getFollowCounts(Integer userId);
    public List<User> findPopularUsers(Integer meId);
    public User changePassword(Integer userId, ChangePasswordRequest request) throws UserException, BadRequestException;

}
