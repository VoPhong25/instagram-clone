package com.example.tieuluan_api.controller;

import com.example.tieuluan_api.config.JwtProvider;
import com.example.tieuluan_api.dto.UserDTO;
import com.example.tieuluan_api.dto.response.AuthResponse;
import com.example.tieuluan_api.entity.Role;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.mapper.UserMapper;
import com.example.tieuluan_api.repository.RoleRepository;
import com.example.tieuluan_api.repository.UserRepository;
import com.example.tieuluan_api.service.CustomUserDetailServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
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
    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> registerUser(@RequestBody User req) throws UserException {

        if (req.getEmail() == null || req.getPassword() == null || req.getFullname() == null) {
            throw new UserException("All fields are required");
        }

        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new UserException("Email already exists");
        }

        if (userRepository.findByUsername(req.getUsername()).isPresent()) {
            throw new UserException("Username already taken");
        }

        User newUser = new User();
        newUser.setUsername(req.getUsername());
        newUser.setEmail(req.getEmail());
        newUser.setFullname(req.getFullname());
        newUser.setPassword(passwordEncoder.encode(req.getPassword()));

        Role userRole = roleRepository.findByRole("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("ROLE_USER not found"));

        newUser.setRole(userRole);

        User savedUser = userRepository.save(newUser);

        UserDTO userDTO = UserMapper.toUserDTO(savedUser, savedUser);

        // Spring Security auth
        List<GrantedAuthority> authorities =
                AuthorityUtils.createAuthorityList(userRole.getRole());

        Authentication auth = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(),
                null,
                authorities
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@RequestBody User user) throws UserException {
        String username = user.getEmail();
        String password = user.getPassword();
        //Validate the username and password then return to spring security auth to create jwt token
        Authentication authentication = authenticate(username, password);
        //Tạo jwt token
        String token = jwtProvider.generateToken(authentication);
//        Optional<User> opt = userRepository.findByEmail(username);

        AuthResponse authResponse = new AuthResponse(token, true);
        //Return token to client for validate further
        return new ResponseEntity<>(authResponse, HttpStatus.ACCEPTED);
    }
    @GetMapping("validateToken")
    public ResponseEntity<?> vaidateToken(@RequestHeader("Authorization") String token){
        boolean validate = jwtProvider.validateToken(token);
        return new ResponseEntity<>(validate,HttpStatus.OK);
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
