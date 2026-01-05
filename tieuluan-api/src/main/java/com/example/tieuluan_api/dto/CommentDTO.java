package com.example.tieuluan_api.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
    private Integer id;
    private String content;
    private LocalDateTime createdAt;

    private UserMiniDTO userMiniDTO;
    private Integer postId;
    private Integer totalLikes;
    private boolean isLiked;
}
