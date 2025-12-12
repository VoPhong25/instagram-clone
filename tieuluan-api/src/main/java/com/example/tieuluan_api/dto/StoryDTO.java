package com.example.tieuluan_api.dto;

import com.example.tieuluan_api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoryDTO {
    private Integer id;
    private UserMiniDTO user;
    private String image;
    private String caption;
    private LocalDateTime timestamp;
}
