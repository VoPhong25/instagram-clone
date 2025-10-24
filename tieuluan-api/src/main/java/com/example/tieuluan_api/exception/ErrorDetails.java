package com.example.tieuluan_api.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ErrorDetails {
    private String message;
    private String details;
    private LocalDateTime timestamp;


}
