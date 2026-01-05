package com.example.tieuluan_api.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DirectMessageDTO {
    private Integer id;
    private UserMessageDTO sender;
    private UserMessageDTO recipient;
    private String content;
    private String imageUrl;
    private LocalDateTime createdAt;
}
