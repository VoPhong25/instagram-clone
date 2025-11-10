package com.example.tieuluan_api.dto.response;

import com.example.tieuluan_api.entity.User;

public record UserFollowResponse(Integer id, String username, String fullname) {
    public static UserFollowResponse of(User user){
        return new UserFollowResponse(user.getId(), user.getUsername(), user.getFullname());
    }

}
