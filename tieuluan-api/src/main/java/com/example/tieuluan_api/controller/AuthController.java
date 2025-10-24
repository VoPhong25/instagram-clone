package com.example.tieuluan_api.controller;

import com.example.tieuluan_api.dto.request.UserCreateReq;
import com.example.tieuluan_api.dto.response.UserCreateResponse;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserServiceImpl userService;
    @PostMapping("/register")
    public ResponseEntity<UserCreateResponse> registerUser(@RequestBody UserCreateReq req) throws UserException {
        return new ResponseEntity<>(userService.registerUser(req), HttpStatus.OK);
    }

}
