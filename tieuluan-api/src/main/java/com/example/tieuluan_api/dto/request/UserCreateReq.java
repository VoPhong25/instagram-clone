package com.example.tieuluan_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateReq {
    private String password;
    private String mobile;
    private String username;
    private String email;
    private String fullname;
}
