package com.example.tieuluan_api.controller;

import com.example.tieuluan_api.dto.UserDTO;
import com.example.tieuluan_api.dto.request.UserUpdateReq;
import com.example.tieuluan_api.dto.response.MessageResponse;
import com.example.tieuluan_api.dto.response.UserFollowResponse;
import com.example.tieuluan_api.dto.response.UserUpdateResponse;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.mapper.UserMapper;
import com.example.tieuluan_api.service.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final IUserService userService;

    @GetMapping("/find/{userId}")
    public ResponseEntity<UserDTO> findUserById(@PathVariable Integer userId, @RequestHeader("Authorization") String token) throws UserException {
        User userReq = userService.findUserProfile(token);
        User user = userService.findUserById(userId);
        UserDTO userDTO = UserMapper.toUserDTO(user, userReq);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
    @GetMapping("/findUsername/{username}")
    public ResponseEntity<UserDTO> findUserByUsername(@PathVariable String username, @RequestHeader("Authorization") String token) throws UserException {
        User userReq = userService.findUserProfile(token);
        User user = userService.findUserByUsername(username);
        UserDTO userDTO = UserMapper.toUserDTO(user, userReq);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
    @PostMapping("/follow/{followUserId}")
    public ResponseEntity<MessageResponse> follow(@PathVariable Integer followUserId,@RequestHeader("Authorization") String token) throws UserException {
        User userReq = userService.findUserProfile(token);
        String message= userService.followUser(userReq.getId(), followUserId);
        MessageResponse messageResponse = new MessageResponse(message);
        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> findUserProfile(@RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findUserProfile(token);
        UserDTO userDTO = UserMapper.toUserDTO(user, user);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @GetMapping("/{userIds}")
    public ResponseEntity<List<UserDTO>> findUsersByIds(@PathVariable List<Integer> userIds, @RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findUserProfile(token);
        List<User> users = userService.findUsersByIds(userIds);
        List<UserDTO> userDTOS = new ArrayList<>();
        for (User u : users) {
            UserDTO userDTO = UserMapper.toUserDTO(u, user);
            userDTOS.add(userDTO);
        }
        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }

    //        api/user/search?q=query
    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> searchUsers(@RequestParam("q") String query, @RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findUserProfile(token);
        List<User> users = userService.searchUsers(query);
        List<UserDTO> userDTOS = new ArrayList<>();
        for (User u : users) {
            UserDTO userDTO = UserMapper.toUserDTO(u, user);
            userDTOS.add(userDTO);
        }
        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }

    @PutMapping("/account/edit")
    public ResponseEntity<UserUpdateResponse> updateUser(@RequestHeader("Authorization") String token,
            @Valid @RequestBody UserUpdateReq req) throws UserException {
        User user = userService.findUserProfile(token);
        UserUpdateResponse res =
                userService.updateUserDetails(user.getId(), req);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // get list followers
    @GetMapping("/followers/{id}")
    public Page<UserFollowResponse> followers(@PathVariable Integer id,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "20") int size) {
        return userService.findFollowersOf(id, PageRequest.of(page, size));
    }

    // get list following
    @GetMapping("/following/{id}")
    public Page<UserFollowResponse> following(@PathVariable Integer id,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "20") int size) {
        return userService.findFollowingOf(id, PageRequest.of(page, size));
    }

    @GetMapping("/follow-counts/{id}")
    public Map<String, Long> followCounts(@PathVariable Integer id) {
        return userService.getFollowCounts(id);
    }
}
