package com.example.tieuluan_api.util;

import com.example.tieuluan_api.entity.Comment;
import com.example.tieuluan_api.entity.User;

public class CommentUtil {
    public final static boolean isLikedByReqUser(User reqUser, Comment comment) {
        return comment.getLikeByUser().stream()
                .anyMatch(u -> u.getId().equals(reqUser.getId()));
    }
}
