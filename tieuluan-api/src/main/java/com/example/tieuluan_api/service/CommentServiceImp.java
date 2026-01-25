package com.example.tieuluan_api.service;

import com.example.tieuluan_api.entity.Comment;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.CommentException;
import com.example.tieuluan_api.exception.PostException;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.repository.CommentRepository;
import com.example.tieuluan_api.repository.PostRepository;
import com.example.tieuluan_api.service.notificationService.INotificationService;
import com.example.tieuluan_api.service.notificationService.NotificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
    private INotificationService notificationService;

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
        notificationService.sendNotification(NotificationType.COMMENT, user,post.getUser(), post);
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> findCommentsByPostId(Integer postId) throws CommentException, PostException {
        Post post = postService.findPostById(postId);
        if(post!=null) {
            List<Comment> commentLists = post.getComment();
            return commentLists;
        }
        throw new PostException("Post not found with id: " + postId);
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException {
        User user = userService.findUserById(userId);
        Optional<Comment> opt = commentRepository.findById(commentId);
        Comment comment = opt.get();
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
    @Transactional
    public String deleteComment(Integer commentId, Integer userId)
            throws CommentException, UserException {

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentException("Comment not found"));

        if (!userId.equals(comment.getUser().getId())) {
            throw new CommentException("You can't delete other user's comment");
        }

        commentRepository.deleteByCommentId(commentId);
        commentRepository.delete(comment);

        return "Comment successfully deleted";
    }


    @Override
    public Comment updateComment(Integer commentId, Comment req, Integer userId) throws CommentException {
        Optional<Comment> opt = commentRepository.findById(commentId);
        Comment comment = opt.get();
        if (comment==null) throw new CommentException("Comment not found with id: " + commentId);
        if (userId==comment.getUser().getId()){
            comment.setContent(req.getContent());
            return commentRepository.save(comment);
        }
        throw new CommentException("You can't update other user comment");
    }
}
