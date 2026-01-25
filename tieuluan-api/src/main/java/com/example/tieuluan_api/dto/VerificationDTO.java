package com.example.tieuluan_api.dto;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class VerificationDTO {
        private boolean status;
        private LocalDateTime startedAt;
        private LocalDateTime endsAt;
        private String planType;
        private String code;
}
