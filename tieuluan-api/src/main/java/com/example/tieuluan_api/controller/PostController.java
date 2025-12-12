package com.example.tieuluan_api.controller;

import com.example.tieuluan_api.dto.PostDTO;
import com.example.tieuluan_api.dto.response.MessageResponse;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.PostException;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.mapper.PostMapper;
import com.example.tieuluan_api.service.IPostService;
import com.example.tieuluan_api.service.IUserService;
import com.example.tieuluan_api.util.SecurityUtils;
import com.example.tieuluan_api.service.PostServiceImp;
import com.example.tieuluan_api.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    private IPostService postService;
    private final IUserService userService;
    private final PostMapper postMapper;


    @PostMapping("/create")
    public ResponseEntity<PostDTO> createPost(@RequestBody Post req, @RequestHeader("Authorization") String token) throws UserException{
        User user = userService.findUserProfile(token);
        Post post = postService.createPost(req,user.getId());

        PostDTO postDTO = PostMapper.toPostDTO(post, user);

        return new ResponseEntity<>(postDTO, HttpStatus.CREATED);
    }
    @PostMapping("/savedPost/{postId}")
    public ResponseEntity<MessageResponse> savedPost(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws PostException, UserException {
        User user = userService.findUserProfile(token);
        String message = postService.savedPost(postId, user.getId());
        MessageResponse messageResponse = new MessageResponse(message);

        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }
    @GetMapping("/all/{userId}")
    public ResponseEntity<List<PostDTO>> findPostByUserId( @PathVariable Integer userId, @RequestHeader("Authorization") String token) throws UserException{
        User user = userService.findUserProfile(token);
         List<Post> posts = postService.findPostByUserId(userId);
         List<PostDTO> postDTOS = postMapper.toDtoList(posts, user);
         return new ResponseEntity<>(postDTOS, HttpStatus.OK);
    }
    @GetMapping("/following")
    public ResponseEntity<List<PostDTO>> findAllPostByUserIds( @RequestParam List<Integer> userIds, @RequestHeader("Authorization") String token) throws UserException, PostException {
        User user = userService.findUserProfile(token);
        userIds.add(user.getId());
        List<Post> posts = postService.findAllPostByUserIds(userIds);
        List<PostDTO> postDTOS = postMapper.toDtoList(posts, user);
        return new ResponseEntity<>(postDTOS, HttpStatus.OK);
    }
    @GetMapping("{postId}")
    public ResponseEntity<PostDTO> findPostById(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws PostException, UserException {
        User user = userService.findUserProfile(token);
        Post post = postService.findPostById(postId);
        PostDTO postDTO = PostMapper.toPostDTO(post, user);
        return new ResponseEntity<>(postDTO, HttpStatus.OK);
    }
    @PostMapping("/likePost/{postId}")
    public ResponseEntity<PostDTO> likePost(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws PostException, UserException {
        User user = userService.findUserProfile(token);
        Post post = postService.likePost(postId, user);
        PostDTO postDTO = PostMapper.toPostDTO(post, user);
        return new ResponseEntity<>(postDTO, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<MessageResponse> deletePost(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws PostException, UserException {
        User user = userService.findUserProfile(token);
        String message = postService.deletePost(postId, user.getId());
        MessageResponse messageResponse = new MessageResponse(message);
        return new ResponseEntity<>(messageResponse, HttpStatus.ACCEPTED);
    }

}
