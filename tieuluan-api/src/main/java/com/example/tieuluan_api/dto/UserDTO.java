package com.example.tieuluan_api.dto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Data
public class UserDTO {
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
    private List<StoryDTO> stories = new ArrayList<>();
    private List<PostMiniDTO> posts = new ArrayList<>();
    private List<PostMiniDTO> savePost = new ArrayList<>();
    private boolean isFollowed;//ReqUser is following this user or not
    private RoleDTO role;
    private LocalDateTime createdAt;
}
