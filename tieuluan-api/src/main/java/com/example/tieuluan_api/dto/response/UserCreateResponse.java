package com.example.tieuluan_api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateResponse {
    private Integer id;
    private String mobile;
    private String username;
    private String email;
    private String fullname;
}
