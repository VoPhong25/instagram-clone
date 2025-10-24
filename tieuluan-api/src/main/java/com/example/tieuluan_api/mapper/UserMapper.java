package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.request.UserCreateReq;
import com.example.tieuluan_api.dto.request.UserUpdateReq;
import com.example.tieuluan_api.dto.response.UserCreateResponse;
import com.example.tieuluan_api.dto.response.UserUpdateResponse;
import com.example.tieuluan_api.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreateReq request);
    UserCreateResponse toUserCreateResponse(User user);
    UserUpdateResponse toUserUpdateResponse(User user);
    void updateUser(@MappingTarget User user, UserUpdateReq req);
}
