package com.example.tieuluan_api.service;

import com.example.tieuluan_api.entity.Comment;
import com.example.tieuluan_api.exception.CommentException;
import com.example.tieuluan_api.exception.PostException;
import com.example.tieuluan_api.exception.UserException;

import java.util.List;

public interface ICommentService {
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws UserException, PostException;
    public List<Comment> findCommentsByPostId(Integer postId) throws CommentException, PostException;
    public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException;
    public String deleteComment(Integer commentId, Integer userId) throws CommentException, UserException;
    public Comment updateComment(Integer commentId, Comment req, Integer userId) throws CommentException;

}
