package com.example.tieuluan_api.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
@Data
public class UserMessageDTO {
    private Integer id;
    private String username;
    private String fullname;
    private String email;
    private String mobile;
    private String website;
    private String bio;
    private String gender;
    private String image;

    private Set<UserMiniDTO> followers = new HashSet<>();
    private Set<UserMiniDTO> following = new HashSet<>();
    private boolean isFollowed;//ReqUser is following this user or not
    private LocalDateTime createdAt;
}
