package com.example.tieuluan_api.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Verification {
    private boolean status = true;
    private LocalDateTime startedAt;
    private LocalDateTime endsAt;
    private String planType;
    private String code;

}
