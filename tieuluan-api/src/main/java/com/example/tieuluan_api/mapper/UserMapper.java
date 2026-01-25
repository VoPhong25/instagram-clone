package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.RoleDTO;
import com.example.tieuluan_api.dto.UserDTO;
import com.example.tieuluan_api.dto.UserMessageDTO;
import com.example.tieuluan_api.dto.UserMiniDTO;
import com.example.tieuluan_api.dto.request.UserCreateReq;
import com.example.tieuluan_api.dto.request.UserUpdateReq;
import com.example.tieuluan_api.dto.response.UserCreateResponse;
import com.example.tieuluan_api.dto.response.UserUpdateResponse;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.Story;
import com.example.tieuluan_api.entity.User;
import org.mapstruct.*;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "password", ignore = true)
    User toUser(UserCreateReq request);
    UserCreateResponse toUserCreateResponse(User user);
    UserUpdateResponse toUserUpdateResponse(User user);
    void updateUser(@MappingTarget User user, UserUpdateReq req);
    static UserDTO toUserDTO(User user, User reqUser) {
        if (user == null) return null;

        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFullname(user.getFullname());
        dto.setEmail(user.getEmail());
        dto.setMobile(user.getMobile());
        dto.setWebsite(user.getWebsite());
        dto.setBio(user.getBio());
        dto.setGender(user.getGender());
        dto.setImage(user.getImage());
        dto.setCreatedAt(user.getCreatedAt());

        // followers
        Set<User> followers = user.getFollowers();
        if (followers == null || followers.isEmpty()) {
            dto.setFollowers(Collections.emptySet());
        } else {
            dto.setFollowers(
                    followers.stream()
                            .filter(Objects::nonNull)
                            .map(UserMapper::toUserFollowDTO)
                            .collect(Collectors.toSet())
            );
        }

        // following
        Set<User> following = user.getFollowing();
        if (following == null || following.isEmpty()) {
            dto.setFollowing(Collections.emptySet());
        } else {
            dto.setFollowing(
                    following.stream()
                            .filter(Objects::nonNull)
                            .map(UserMapper::toUserFollowDTO)
                            .collect(Collectors.toSet())
            );
        }
        List<Post> savePost = user.getSavePost();
        if(savePost == null || savePost.isEmpty()){
            dto.setSavePost(Collections.emptyList());
        } else {
            dto.setSavePost(
                    savePost.stream()
                            .filter(Objects::nonNull)
                            .map(p -> PostMapper.toPostMiniDTO(p, reqUser))
                            .collect(Collectors.toList())
            );
        }
        // posts
        List<Post> posts = user.getPosts();
        if (posts == null || posts.isEmpty()) {
            dto.setPosts(Collections.emptyList());
        } else {
            dto.setPosts(
                    posts.stream()
                            .filter(Objects::nonNull)
                            .map(p-> PostMapper.toPostMiniDTO(p, reqUser))
                            .collect(Collectors.toList())
            );

        }
        List<Story> stories = user.getStories();
        if (stories == null || stories.isEmpty()) {
            dto.setStories(Collections.emptyList());
        } else {
            dto.setStories(
                    stories.stream()
                            .filter(Objects::nonNull)
                            .map(s-> StoryMapper.toDTO(s, reqUser))
                            .collect(Collectors.toList())
            );

        }


        // isFollowed — so sánh theo id
        boolean isFollowed = false;
        if (reqUser != null && reqUser.getId() != null && followers != null) {
            isFollowed = followers.stream()
                    .map(User::getId)
                    .filter(Objects::nonNull)
                    .anyMatch(id -> id.equals(reqUser.getId()));
        }
        dto.setFollowed(isFollowed);
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(user.getRole().getId());
        roleDTO.setRole(user.getRole().getRole());

        dto.setRole(roleDTO);
        dto.setVerification(VerificationDTOMapper.toVerificationDTO(user.getVerification()));

        return dto;
    }
    static UserMessageDTO toUserMessageDTO(User user, User reqUser) {
        if (user == null) return null;

        UserMessageDTO dto = new UserMessageDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFullname(user.getFullname());
        dto.setEmail(user.getEmail());
        dto.setMobile(user.getMobile());
        dto.setWebsite(user.getWebsite());
        dto.setBio(user.getBio());
        dto.setGender(user.getGender());
        dto.setImage(user.getImage());
        dto.setCreatedAt(user.getCreatedAt());

        // followers
        Set<User> followers = user.getFollowers();
        if (followers == null || followers.isEmpty()) {
            dto.setFollowers(Collections.emptySet());
        } else {
            dto.setFollowers(
                    followers.stream()
                            .filter(Objects::nonNull)
                            .map(UserMapper::toUserFollowDTO)
                            .collect(Collectors.toSet())
            );
        }

        // following
        Set<User> following = user.getFollowing();
        if (following == null || following.isEmpty()) {
            dto.setFollowing(Collections.emptySet());
        } else {
            dto.setFollowing(
                    following.stream()
                            .filter(Objects::nonNull)
                            .map(UserMapper::toUserFollowDTO)
                            .collect(Collectors.toSet())
            );
        }
        boolean isFollowed = false;
        if (reqUser != null && reqUser.getId() != null && followers != null) {
            isFollowed = followers.stream()
                    .map(User::getId)
                    .filter(Objects::nonNull)
                    .anyMatch(id -> id.equals(reqUser.getId()));
        }
        dto.setFollowed(isFollowed);

        return dto;}


    static UserMiniDTO toUserFollowDTO(User user) {
        if (user == null) return null;
        UserMiniDTO dto = new UserMiniDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setImage(user.getImage());
        return dto;
    }
}
