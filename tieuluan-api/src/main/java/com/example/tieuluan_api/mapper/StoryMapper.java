package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.StoryDTO;
import com.example.tieuluan_api.entity.Story;
import com.example.tieuluan_api.entity.User;
import org.mapstruct.Mapper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface StoryMapper {
    static StoryDTO toDTO(Story story, User userReq){
        StoryDTO dto = new StoryDTO();
        dto.setId(story.getId());
        dto.setCaption(story.getCaption());
        dto.setImage(story.getImage());
        dto.setUser(UserMapper.toUserFollowDTO(userReq));
        dto.setTimestamp(story.getTimestamp());
        return dto;
    }
    static List<StoryDTO> toDtoList(List<Story> storys, User reqUser) {
        if (storys == null || storys.isEmpty()) return Collections.emptyList();
        return storys.stream()
                .filter(Objects::nonNull)
                .map(s -> StoryMapper.toDTO(s, reqUser))
                .collect(Collectors.toList());
    }
}
