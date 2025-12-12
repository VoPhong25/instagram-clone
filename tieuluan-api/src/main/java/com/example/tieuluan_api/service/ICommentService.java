package com.example.tieuluan_api.service;

import com.example.tieuluan_api.entity.Comment;
import com.example.tieuluan_api.exception.CommentException;
import com.example.tieuluan_api.exception.PostException;
import com.example.tieuluan_api.exception.UserException;

public interface ICommentService {
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws UserException, PostException;
    public Comment findCommentById(Integer id) throws CommentException;
    public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException;
    public String deleteComment(Integer commentId, Integer userId) throws CommentException, UserException;
    public Comment updateComment(Integer commentId, Comment req, Integer userId) throws CommentException;

}
