package com.example.tieuluan_api.util;

import com.example.tieuluan_api.entity.Like;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;

public class PostUtil {
    //Check if user liked the tweet or not
    public static boolean isLikedByReqUser(User reqUser, Post post) {
        if (post == null || post.getLikes() == null || reqUser == null) return false;
        return post.getLikes().stream()
                .anyMatch(l -> l.getUser().getId().equals(reqUser.getId()));
    }

    public final static boolean isSavedByReqUser(User reqUser, Post post){
        for(Post posts: reqUser.getSavePost()){
            if(posts.getId() == post.getId()){
                return true;
            }
        }
        return false;
    }
}
