package com.example.tieuluan_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {
    private Integer id;
    private String image;
    private String caption;
    private String location;
    private LocalDateTime createdAt;
    private boolean isLiked;
    private boolean isSaved;

    private int totalLike;
    private int totalComment;

    private UserDTO user;
    private List<CommentDTO> comments;
}

