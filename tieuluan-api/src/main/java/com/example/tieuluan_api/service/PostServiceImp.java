package com.example.tieuluan_api.service;

import com.example.tieuluan_api.entity.Like;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.PostException;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.repository.LikeRepository;
import com.example.tieuluan_api.repository.PostRepository;
import com.example.tieuluan_api.repository.UserRepository;
import com.example.tieuluan_api.service.notificationService.INotificationService;
import com.example.tieuluan_api.service.notificationService.NotificationType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImp implements IPostService{
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private IUserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private INotificationService notificationService;
    @Override
    public Post createPost(Post req, Integer userId) throws UserException {
        User user = userService.findUserById(userId);
        Post post = new Post();
        post.setUser(user);
        post.setCreatedAt(LocalDateTime.now());
        post.setImage(req.getImage());
        post.setCaption(req.getCaption());
        post.setLocation(req.getLocation());
        return postRepository.save(post);
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws UserException, PostException {
        Post post = findPostById(postId);
        if(post.getUser().getId().equals(userId)){
            for (User u : post.getSavedByUsers()) {
                u.getSavePost().remove(post);
            }
            postRepository.deleteByPostId(postId);
            postRepository.delete(post);
            return "Post successfully deleted!";
        }
        throw new PostException("You can't delete other user post");
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) throws UserException {
        List<Post> posts = postRepository.findByUserId(userId);
        return posts;
    }

    @Override
    public Post findPostById(Integer postId) throws PostException {
        Optional<Post> opt = postRepository.findById(postId);
        if(opt.isPresent()){
            return opt.get();
        }
        throw new PostException("Post not found with id: " + postId);
    }

    @Override
    // find all post theo list User ids
    public List<Post> findAllPostByUserIds(List<Integer> userIds) throws PostException, UserException {
       List<Post> posts = postRepository.findAllPostByuserIds(userIds);
       if(posts.size()==0){
           throw new UserException("No post available");
       }
        return posts;
    }

    @Override
    public String savedPost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);
        //kiem tra neu chua save thi save
        if(!user.getSavePost().contains(post)){
            user.getSavePost().add(post);
            post.getSavedByUsers().add(user);
            postRepository.save(post);
            userRepository.save(user);
            return "Post Saved Successfully";
            //neu saved thi xoa
        }else{
            user.getSavePost().remove(post);
            post.getSavedByUsers().remove(user);
            postRepository.save(post);
            userRepository.save(user);
            return "Post Remove Successfully";
        }
    }

    @Override
    public Post likePost(Integer postId, User user) throws PostException {
            Post post = findPostById(postId);
            if(post == null){
                throw new PostException("Post not found witd id: " + postId);
            }

            // Kiểm tra xem user đã like chưa
            Optional<Like> existingLike = likeRepository.findByUserAndPost(user, post);

        if (existingLike.isPresent()) {
            // unlike
            likeRepository.delete(existingLike.get());
            post.getLikes().remove(existingLike.get());
        }  {
            // like mới
            Like newLike = new Like();
            newLike.setUser(user);
            newLike.setPost(post);
            newLike.setCreatedAt(LocalDateTime.now());
            likeRepository.save(newLike);
            post.getLikes().add(newLike);
            notificationService.sendNotification(NotificationType.LIKE, user,post.getUser(),post);
        }
        postRepository.save(post);

        return post;
        }

}
