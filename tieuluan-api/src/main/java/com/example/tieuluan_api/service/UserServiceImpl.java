package com.example.tieuluan_api.service;


import com.example.tieuluan_api.config.JwtProvider;
import com.example.tieuluan_api.dto.request.UserUpdateReq;
import com.example.tieuluan_api.dto.response.UserFollowResponse;
import com.example.tieuluan_api.dto.response.UserUpdateResponse;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.mapper.UserMapper;
import com.example.tieuluan_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public
class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserById(Integer userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get();
        }
        throw new UserException("User not exist with id " + userId);
    }

    @Override
    public User findUserProfile(String token) throws UserException {
        String email = jwtProvider.getEmailFromToken(token);
        Optional<User> opt = userRepository.findByEmail(email);
        if (opt.isPresent()) {
            return opt.get();
        }
        throw new UserException("Invalid token.......");
    }

    @Override
    public User findUserByUsername(String username) throws UserException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get();
        }
        throw new UserException("User not found with username: " + username);
    }

    @Override
    public User followUser(Integer reqUserId, Integer followUserId) throws UserException {
        //kiem tra dau vao
        if (reqUserId == null || followUserId == null) {
            throw new UserException("Missing user id");
        }
        if (reqUserId.equals(followUserId)) {
            throw new UserException("You can't follow youself.");
        }

        User me = userRepository.findById(reqUserId)
                .orElseThrow(() -> new UserException("User with id=" + reqUserId + " not found"));
        User target = userRepository.findById(followUserId)
                .orElseThrow(() -> new UserException("User with id=" + followUserId + " not found"));

        // kiem tra da follow chua
        boolean isFollowing = me.getFollowing().contains(target);

        if (isFollowing) {
            // neu da follow thi un
            me.getFollowing().remove(target);
            target.getFollowers().remove(me);
            userRepository.save(me);
            userRepository.save(target);
            return target;
        } else {
            // neu chua follow thi follow
            me.getFollowing().add(target);
            target.getFollowers().add(me);
            userRepository.save(me);
            userRepository.save(target);

            return target;
        }
    }

    @Override
    public List<User> findUsersByIds(List<Integer> userId) throws UserException {
        List<User> users = userRepository.findAllUsersByUserIds(userId);
        return users;
    }

    @Override
    public List<User> searchUsers(String query) throws UserException {
        List<User> users = userRepository.findByQuery(query);
        return users;
    }

    @Override
    public UserUpdateResponse updateUserDetails(Integer userReq, UserUpdateReq req) throws UserException {
        User user = userRepository.findById(userReq).orElseThrow(() -> new UserException("User not found"));
        if (req.getUsername() != null) {
            User existUser = findUserByUsername(req.getUsername());
            if (existUser != null && !existUser.getId().equals(userReq)) {
                throw new UserException("Username { " + req.getUsername() + " } already exists");
            }
        }
        if (req.getEmail() != null) {
            Optional<User> existEmail = userRepository.findByEmail(req.getEmail());
            if (existEmail.isPresent() && !existEmail.get().getId().equals(userReq)) {
                throw new UserException("Email { " + req.getEmail() + " } already exists");
            }
        }

        if (req.getFullname() != null) user.setFullname(req.getFullname());
        if (req.getUsername() != null) user.setUsername(req.getUsername());
        if (req.getEmail() != null) user.setEmail(req.getEmail());
        if (req.getBio() != null) user.setBio(req.getBio());
        if (req.getMobile() != null) user.setMobile(req.getMobile());
        if (req.getGender() != null) user.setGender(req.getGender());
        if (req.getWebsite() != null) user.setWebsite(req.getWebsite());
        if (req.getImage() != null) user.setImage(req.getImage());
        return userMapper.toUserUpdateResponse(userRepository.save(user));
    }

    @Override
    public String removeAvt(Integer userId) throws UserException {
        User userReq = findUserById(userId);
        if (userReq != null) {
            userReq.setImage(null);
            userRepository.save(userReq);
            return "Remove avatar sucessfully!";
        }
        throw new UserException("You can't delete other user avatar");
    }


    @Override
    public Page<UserFollowResponse> findFollowersOf(Integer id, Pageable pageable) {
        Page<User> listFollowers = userRepository.findFollowersOf(id, pageable);
        return listFollowers.map(UserFollowResponse::of);
    }

    @Override
    public Page<UserFollowResponse> findFollowingOf(Integer id, Pageable pageable) {
        Page<User> listFollowing = userRepository.findFollowingOf(id, pageable);
        return listFollowing.map(UserFollowResponse::of);
    }

    @Transactional(readOnly = true)
    public Map<String, Long> getFollowCounts(Integer userId) {
        long followers = userRepository.countFollowersOf(userId);
        long following = userRepository.countFollowingOf(userId);
        return Map.of("followers", followers, "following", following);
    }

    @Override
    public List<User> findPopularUsers(Integer meId) {
        List<User> users = userRepository.findPopularUsers(
                meId,
                PageRequest.of(0, 6)
        );

        return users;
    }
}

