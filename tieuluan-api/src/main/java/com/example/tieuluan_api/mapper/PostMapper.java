package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.PostDTO;
import com.example.tieuluan_api.dto.PostMiniDTO;
import com.example.tieuluan_api.entity.Post;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.util.PostUtil;
import org.mapstruct.Mapper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PostMapper {

    // Static manual mapper — có thể gọi trực tiếp: PostMapper.toPostDTO(post, reqUser)
    static PostDTO toPostDTO(Post post, User reqUser) {
        if (post == null) return null;

        PostDTO dto = new PostDTO();
        dto.setId(post.getId());
        dto.setImage(post.getImage());
        dto.setCaption(post.getCaption());
        dto.setLocation(post.getLocation());
        dto.setCreatedAt(post.getCreatedAt());

        // null-safe: nếu likes là null -> 0
        int totalLike = post.getLikes() == null ? 0 : post.getLikes().size();
        int totalComment = post.getComment() == null ? 0 : post.getComment().size();
        dto.setTotalLike(totalLike);
        dto.setTotalComment(totalComment);

        // Kiểm tra user có like hay không (PostUtil nên null-safe)
        dto.setLiked(PostUtil.isLikedByReqUser(reqUser, post));
        dto.setSaved(PostUtil.isSavedByReqUser(reqUser, post));

        // UserDTO (giả sử UserMapper.toUserDTO là static)
        dto.setUser(UserMapper.toUserDTO(post.getUser(), reqUser));

        // CommentDTO (giả sử CommentMapper.toCommentDTO là static và null-safe)
        dto.setComments(
                post.getComment() == null
                        ? Collections.emptyList()
                        : post.getComment().stream()
                        .filter(Objects::nonNull)
                        .map(c -> CommentMapper.toCommentDTO(c, reqUser))
                        .collect(Collectors.toList())
        );

        return dto;
    }

    // Map list (kết hợp static mapper)
    default List<PostDTO> toDtoList(List<Post> posts, User reqUser) {
        if (posts == null || posts.isEmpty()) return Collections.emptyList();
        return posts.stream()
                .filter(Objects::nonNull)
                .map(p -> PostMapper.toPostDTO(p, reqUser))
                .collect(Collectors.toList());
    }
    static PostMiniDTO toPostMiniDTO(Post post) {
        if (post == null) return null;

        PostMiniDTO dto = new PostMiniDTO();
        dto.setId(post.getId());
        dto.setImage(post.getImage());
        return dto;
    }

}
