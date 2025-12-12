package com.example.tieuluan_api.service;

import com.example.tieuluan_api.entity.Comment;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.CommentException;
import com.example.tieuluan_api.exception.PostException;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.repository.CommentRepository;
import com.example.tieuluan_api.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentServiceImp implements ICommentService{
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private IUserService userService;

    @Autowired
    private IPostService postService;
    @Autowired
    private PostRepository postRepository;

    @Override
    public Comment createComment(Comment req, Integer postId, Integer userId) throws UserException, PostException {
        User user = userService.findUserById(userId);
        Post post = postService.findPostById(postId);
        if(user==null)
             throw new UserException("User not found with id: " + userId);
        if(post==null)
            throw new PostException("Post not found with id: " + postId);
        Comment comment = new Comment();
        comment.setUser(user);
        comment.setContent(req.getContent());
        comment.setPost(post);
        post.getComment().add(comment);
        postRepository.save(post);

        return commentRepository.save(comment);
    }

    @Override
    public Comment findCommentById(Integer id) throws CommentException {
        Optional<Comment> comment = commentRepository.findById(id);
        if(comment.isPresent())
            return comment.get();
        throw new CommentException("Commemt not found with id: " + id);
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException {
        User user = userService.findUserById(userId);
        Comment comment = findCommentById(commentId);
        if(!comment.getLikeByUser().contains(user)){
            comment.getLikeByUser().add(user);
            commentRepository.save(comment);
            return comment;
        }else{
            //neu da like comment thi huy like
            comment.getLikeByUser().remove(user);
            commentRepository.save(comment);
            return comment;
        }
    }

    @Override
    public String deleteComment(Integer commentId, Integer userId) throws CommentException, UserException {
        Comment comment = findCommentById(commentId);
        if(userId == comment.getUser().getId()){
            commentRepository.deleteById(commentId);
            return "Comment successfully deleted";
        }
        throw new CommentException("You can't delete orthe user comment");

    }

    @Override
    public Comment updateComment(Integer commentId, Comment req, Integer userId) throws CommentException {
        Comment comment = findCommentById(commentId);
        if (comment==null) throw new CommentException("Comment not found with id: " + commentId);
        if (userId==comment.getUser().getId()){
            comment.setContent(req.getContent());
            return commentRepository.save(comment);
        }
        throw new CommentException("You can't update other user comment");
    }
}
