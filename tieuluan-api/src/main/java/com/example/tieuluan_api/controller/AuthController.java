package com.example.tieuluan_api.controller;

import com.example.tieuluan_api.config.JwtProvider;
import com.example.tieuluan_api.dto.request.UserCreateReq;
import com.example.tieuluan_api.dto.response.AuthResponse;
import com.example.tieuluan_api.dto.response.UserCreateResponse;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.mapper.UserMapper;
import com.example.tieuluan_api.repository.UserRepository;
import com.example.tieuluan_api.service.CustomUserDetailServiceImp;
import com.example.tieuluan_api.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private CustomUserDetailServiceImp customUserDetailServiceImp;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody UserCreateReq req) throws UserException {
        if (req.getEmail() == null || req.getPassword() == null || req.getFullname() == null) {
            throw new UserException("All filds are required");
        }

        Optional<User> isEmailExist = userRepository.findByEmail(req.getEmail());
        if (isEmailExist.isPresent()) {
            throw new UserException("Email Is Arlready Exist");
        }
        Optional<User> isUsernameExist = userRepository.findByUsername(req.getUsername());
        if (isUsernameExist.isPresent()) {
            throw new UserException("Username Is Arlready Taken...");
        }
        if (req.getEmail() == null || req.getPassword() == null || req.getFullname() == null) {
            throw new UserException("All filds are required");
        }

        User newUser = userMapper.toUser(req);
        newUser.setPassword(passwordEncoder.encode(req.getPassword()));
        userRepository.save(newUser);
        //Create auth spring security first and send it to SecurityContextHolder to handle it.
        List<GrantedAuthority> authorities = new ArrayList<>();
        Authentication auth = new UsernamePasswordAuthenticationToken(newUser.getEmail(), req.getPassword(), authorities);
        SecurityContextHolder.getContext().setAuthentication(auth);
        //Create jwt token and send back to client
        String token = jwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse(token, true);

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@RequestBody User user) throws UserException {
        String username = user.getUsername();
        String password = user.getPassword();
        //Validate the username and password then return to spring security auth to create jwt token
        Authentication authentication = authenticate(username, password);
        //Tạo jwt token
        String token = jwtProvider.generateToken(authentication);
//        Optional<User> opt = userRepository.findByEmail(username);

        AuthResponse authResponse = new AuthResponse(token, true);
        //Return token to client for validate further
        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.ACCEPTED);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetailServiceImp.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username...");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid username of password...");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
//    @PostMapping("/check-email")
//    public ResponseEntity<Boolean> checkEmailExists(@RequestBody String email) {
//        boolean res=checkEmail(email);
//        return ResponseEntity.ok(res);
//    }
//    private boolean checkEmail(String email){
//        boolean res = userRepository.findByEmail(email) != null;
//        System.out.println("email: "+email );
//        System.out.println("Res: "+res);
//        return res;
//    }




}
