package com.example.tieuluan_api.service;

import com.example.tieuluan_api.dto.request.UserCreateReq;
import com.example.tieuluan_api.dto.request.UserUpdateReq;
import com.example.tieuluan_api.dto.response.UserCreateResponse;
import com.example.tieuluan_api.dto.response.UserUpdateResponse;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.mapper.UserMapper;
import com.example.tieuluan_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Override
    public UserCreateResponse registerUser(UserCreateReq req) throws UserException {
        Optional<User> isEmailExist = userRepository.findByEmail(req.getEmail());
        if(isEmailExist.isPresent()){
            throw new UserException("Email Is Arlready Exist");
        }
        Optional<User> isUsernameExist = userRepository.findByUsername(req.getUsername());
        if(isUsernameExist.isPresent()){
            throw new UserException("Username Is Arlready Taken...");
        }
        if(req.getEmail()==null || req.getPassword()==null || req.getFullname()==null){
            throw new UserException("All filds are required");
        }
        User newUser = userMapper.toUser(req);
        userRepository.save(newUser);
        return userMapper.toUserCreateResponse(newUser);

    }

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

        boolean added = me.follow(target); // đồng bộ 2 chiều

         userRepository.save(me);

        if (!added) {
            return "You are already following this user.";
        }
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

        boolean removed = me.unfollow(target); // đồng bộ 2 chiều

         userRepository.save(me);
         userRepository.save(target);

        if (!removed) {
            return "You are not following this user.";
        }
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
}
