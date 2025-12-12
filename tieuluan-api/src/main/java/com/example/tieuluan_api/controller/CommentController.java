package com.example.tieuluan_api.controller;

import com.example.tieuluan_api.dto.CommentDTO;
import com.example.tieuluan_api.dto.response.MessageResponse;
import com.example.tieuluan_api.entity.Comment;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.CommentException;
import com.example.tieuluan_api.exception.PostException;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.mapper.CommentMapper;
import com.example.tieuluan_api.service.ICommentService;
import com.example.tieuluan_api.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private ICommentService commentService;

    @Autowired
    private IUserService userService;


    @PostMapping("/create/{postId}")
    public ResponseEntity<CommentDTO> createComment(@PathVariable Integer postId, @RequestBody Comment req, @RequestHeader("Authorization") String token) throws UserException, PostException {
        User user = userService.findUserProfile(token);
        Comment comment = commentService.createComment(req,postId,user.getId());
        CommentDTO commentDTO = CommentMapper.toCommentDTO(comment, user);
        return new ResponseEntity<>(commentDTO, HttpStatus.CREATED);
    }
    @PostMapping("/like/{commentId}")
    public ResponseEntity<CommentDTO> likeComment(@PathVariable Integer commentId, @RequestHeader("Authorization") String token) throws UserException, CommentException {
        User user = userService.findUserProfile(token);
        Comment comment = commentService.likeComment(commentId, user.getId());
        CommentDTO commentDTO = CommentMapper.toCommentDTO(comment, user);
        return new ResponseEntity<>(commentDTO, HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable Integer commentId, @RequestHeader("Authorization") String token) throws UserException, CommentException {
        User user = userService.findUserProfile(token);
        String deleted = commentService.deleteComment(commentId, user.getId());
        MessageResponse messageResponse = new MessageResponse(deleted);
        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }
    @PutMapping("/update/{commentId}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable Integer commentId, @RequestBody Comment req, @RequestHeader("Authorization") String token) throws UserException, CommentException {
        User user = userService.findUserProfile(token);
        Comment newComment = commentService.updateComment(commentId, req, user.getId());
        CommentDTO commentDTO = CommentMapper.toCommentDTO(newComment, user);
        return new ResponseEntity<>(commentDTO, HttpStatus.OK);
    }

}
