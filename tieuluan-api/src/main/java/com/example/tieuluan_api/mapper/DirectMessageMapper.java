package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.DirectMessageDTO;
import com.example.tieuluan_api.entity.DirectMessage;
import com.example.tieuluan_api.entity.User;

public interface DirectMessageMapper {
    public static DirectMessageDTO toDto(DirectMessage dm, User reqUser) {
        DirectMessageDTO dto = new DirectMessageDTO();
        dto.setId(dm.getId());
        dto.setSender(UserMapper.toUserMessageDTO(dm.getSender(), reqUser)); //only map fullName, id and image
        dto.setRecipient(UserMapper.toUserMessageDTO(dm.getRecipient(), reqUser));
        dto.setContent(dm.getContent());
        dto.setImageUrl(dm.getImageUrl());
        dto.setCreatedAt(dm.getCreatedAt());
        return dto;
    }
}

