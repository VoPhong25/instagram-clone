package com.example.tieuluan_api.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Data
public class UserDTO {
    private Integer id;
    private String username;
    private String email;
    private String name;
    private String userImage;
}
