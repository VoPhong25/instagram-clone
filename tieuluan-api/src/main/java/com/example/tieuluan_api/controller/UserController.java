package com.example.tieuluan_api.controller;

import com.example.tieuluan_api.dto.request.UserCreateReq;
import com.example.tieuluan_api.dto.request.UserUpdateReq;
import com.example.tieuluan_api.dto.response.MessageResponse;
import com.example.tieuluan_api.dto.response.UserCreateResponse;
import com.example.tieuluan_api.dto.response.UserFollowResponse;
import com.example.tieuluan_api.dto.response.UserUpdateResponse;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.service.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserServiceImpl userService;


    @GetMapping("/find/{userId}")
    public ResponseEntity<User> findUserById(@PathVariable Integer userId) throws UserException {
        User user = userService.findUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/follow/{reqUserId}/to/{followUserId}")
    public ResponseEntity<String> follow(@PathVariable Integer reqUserId, @PathVariable Integer followUserId) throws UserException {
        return ResponseEntity.ok(userService.followUser(reqUserId, followUserId));
    }

    @DeleteMapping("/unfollow/{reqUserId}/to/{followUserId}")
    public ResponseEntity<String> unfollow(@PathVariable Integer reqUserId, @PathVariable Integer followUserId) throws UserException {
        return ResponseEntity.ok(userService.unFollowUser(reqUserId, followUserId));
    }

    @GetMapping("/req")
    public ResponseEntity<MessageResponse> findUserProfile(@RequestHeader("Authorization") String token) {

        return null;
    }

    @GetMapping("/{userIds}")
    public ResponseEntity<List<User>> findUsersByIds(@PathVariable List<Integer> userIds) throws UserException {
        List<User> users = userService.findUsersByIds(userIds);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //        api/user/search?q=query
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam("q") String query) throws UserException {
        List<User> users = userService.searchUsers(query);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/{targetUserId}/to/{currentUserId}")
    public ResponseEntity<UserUpdateResponse> updateUser(
            @PathVariable Integer targetUserId,@PathVariable Integer currentUserId,
            @Valid @RequestBody UserUpdateReq req) throws UserException {
//        Integer currentUserId = jwt.getClaim("user_id");
        UserUpdateResponse res =
                userService.updateUserDetails(targetUserId, currentUserId, req);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/followers/{id}")
    public Page<UserFollowResponse> followers(@PathVariable Integer id,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "20") int size) {
        return userService.findFollowersOf(id, PageRequest.of(page, size));
    }

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
