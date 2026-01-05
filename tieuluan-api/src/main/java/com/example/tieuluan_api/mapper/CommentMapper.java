package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.CommentDTO;
import com.example.tieuluan_api.entity.Comment;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.util.CommentUtil;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    // map comment -> CommentDTO, truyền reqUserId để set isLiked và user.isFollowed
    public static CommentDTO toCommentDTO(Comment comment, User reqUser) {
        if (comment == null) return null;

        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setTotalLikes(comment.getLikeByUser().size());
        dto.setLiked(CommentUtil.isLikedByReqUser(reqUser, comment));
        dto.setUserMiniDTO(UserMapper.toUserFollowDTO(comment.getUser()));
        dto.setPostId(comment.getPost().getId());

        return dto;
    }
}
