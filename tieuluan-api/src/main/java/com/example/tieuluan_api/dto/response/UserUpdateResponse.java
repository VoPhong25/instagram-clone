package com.example.tieuluan_api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateResponse {
    private String password;
    private String username;
    private String fullname;
    private String email;
    private String mobile;
    private String website;
    private String bio;
    private String gender;
    private String image;
}
