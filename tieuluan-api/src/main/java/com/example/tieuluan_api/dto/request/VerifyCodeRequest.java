package com.example.tieuluan_api.dto.request;

import lombok.Data;

@Data
public class VerifyCodeRequest {
    private String email;
    private String code;
}