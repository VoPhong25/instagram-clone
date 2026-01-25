package com.example.tieuluan_api.controller;

import com.example.tieuluan_api.dto.*;
import com.example.tieuluan_api.dto.request.BanUserRequest;
import com.example.tieuluan_api.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private IAdminService iAdminService;

    @GetMapping("/analytics/dashboard")
    public ResponseEntity<DashboardAnalyticsDTO> getDashboardAnalytics() {
        DashboardAnalyticsDTO analytics = iAdminService.getDashboardAnalytics();
        return new ResponseEntity<>(analytics, HttpStatus.OK);
    }

    @GetMapping("/analytics/posts")
    public ResponseEntity<PostAnalyticsDTO> getTweetAnalytics() {
        PostAnalyticsDTO analytics = iAdminService.getPostAnalytics();
        return new ResponseEntity<>(analytics, HttpStatus.OK);
    }

    @GetMapping("/analytics/likes")
    public ResponseEntity<LikeAnalyticsDTO> getLikeAnalytics() {
        LikeAnalyticsDTO analytics = iAdminService.getLikeAnalytics();
        return new ResponseEntity<>(analytics, HttpStatus.OK);
    }

    @GetMapping("/analytics/users")
    public ResponseEntity<UserAnalyticsDTO> getUserAnalytics() {
        UserAnalyticsDTO analytics = iAdminService.getUserAnalytics();
        return new ResponseEntity<>(analytics, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers(
            @RequestParam(required = false) String query,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {

        List<UserDTO> users = iAdminService.getAllUsers(query, page, size);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/users/{userId}/ban")
    public ResponseEntity<UserDTO> banUser(
            @PathVariable Integer userId,
            @RequestBody BanUserRequest request) {

        UserDTO bannedUser = iAdminService.banUser(userId, request.getReason());
        return new ResponseEntity<>(bannedUser, HttpStatus.OK);
    }

    @PostMapping("/users/{userId}/unban")
    public ResponseEntity<UserDTO> unbanUser(@PathVariable Integer userId) {
        UserDTO unbannedUser = iAdminService.unbanUser(userId);
        return new ResponseEntity<>(unbannedUser, HttpStatus.OK);
    }
}
