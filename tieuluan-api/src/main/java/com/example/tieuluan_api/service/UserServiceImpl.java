package com.example.tieuluan_api.service;

import com.example.tieuluan_api.dto.request.UserCreateReq;
import com.example.tieuluan_api.dto.request.UserUpdateReq;
import com.example.tieuluan_api.dto.response.UserCreateResponse;
import com.example.tieuluan_api.dto.response.UserFollowResponse;
import com.example.tieuluan_api.dto.response.UserUpdateResponse;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.mapper.UserMapper;
import com.example.tieuluan_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public
class UserServiceImpl implements IUserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;

    @Override
    public User findUserById(Integer userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
           return user.get();
        }
        throw new UserException("User not exist with id " + userId);
    }

    @Override
    public User findUserProfile(String token) throws UserException {
        return null;
    }

    @Override
    public User findUserByUsername(String username) throws UserException {
        return null;
    }

    @Override
    public String followUser(Integer reqUserId, Integer followUserId) throws UserException {
        if (reqUserId == null || followUserId == null) {
            throw new UserException("Thiếu id người dùng.");
        }
        if (reqUserId.equals(followUserId)) {
            throw new UserException("Bạn không thể tự theo dõi chính mình.");
        }

        User me = userRepository.findById(reqUserId)
                .orElseThrow(() -> new UserException("User with id=" + reqUserId + " not found"));
        User target = userRepository.findById(followUserId)
                .orElseThrow(() -> new UserException("User with id=" + followUserId + " not found") );
        if(me.getFollowing().contains(target) || target.getFollowers().contains(me)){
            throw new UserException("You had follow this accout");
        }
        me.getFollowing().add(target);   // dong bo 2 chieu
        target.getFollowers().add(me);

        userRepository.save(me);
        userRepository.save(target);
        return "You have followed " + target.getUsername();
    }

    @Override
    public String unFollowUser(Integer reqUserId, Integer followUserId) throws UserException {
        if (reqUserId == null || followUserId == null) {
            throw new UserException("Thiếu id người dùng.");
        }
        if (reqUserId.equals(followUserId)) {
            throw new UserException("Không hợp lệ.");
        }

        User me = userRepository.findById(reqUserId)
                .orElseThrow(() -> new UserException("User with id=" + reqUserId + " not found"));
        User target = userRepository.findById(followUserId)
                .orElseThrow(() -> new UserException("User with id=" + followUserId + " not found"));

        if(!me.getFollowing().contains(target) || !target.getFollowers().contains(me)){
            throw new UserException("You don't follow this accout");
        }

        me.getFollowing().remove(target);
        target.getFollowers().remove(me);


         userRepository.save(me);
         userRepository.save(target);

        return "You have unfollowed " + target.getUsername();
    }

    @Override
    public List<User> findUsersByIds(List<Integer> userId) throws UserException {
       List<User> users = userRepository.findAllUsersByUserIds(userId);
       return users;
    }

    @Override
    public List<User> searchUsers(String query) throws UserException {
      List<User> users = userRepository.findByQuery(query);
      if(users.size()==0){
          throw new UserException("User not found");
      }
      return users;
    }

    @Override
    public UserUpdateResponse updateUserDetails(Integer targetUserId, Integer currentUserId, UserUpdateReq req) throws UserException {
        User user = userRepository.findById(targetUserId).orElseThrow(() -> new UserException("User not found"));
        if(!targetUserId.equals(currentUserId)) {
            throw new UserException("You can't update this user");
        }
        userMapper.updateUser(user, req);

        return userMapper.toUserUpdateResponse(userRepository.save(user));
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


}
