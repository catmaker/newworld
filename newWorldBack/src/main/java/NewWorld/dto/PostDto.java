package NewWorld.dto;

import NewWorld.PostType;
import NewWorld.domain.Comment;
import NewWorld.domain.Post;
import NewWorld.domain.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

/**
 * 2024.01.28 jeonil
 * 게시판 서비스
 */
@Getter
@Setter
public class PostDto {

    private String nickname;

    private String name;

    private Long postId;

    @NotBlank
    @NotEmpty
    @NotNull
    private String title;

    @NotBlank
    @NotEmpty
    @NotNull
    private String detail;

    private List<Comment> comments;

    private LocalDateTime makedDate;

    private PostType postType;

    private int like;

    private int views;
    /**
     * 게사판정보 ->dto
     * @param post
     */
    public PostDto toDto(Post post){

        this.title = post.getTitle();
        this.detail = post.getDetail();
        this.comments = post.getCommentList();
        this.makedDate = post.getMakedDate();
        this.nickname = post.getUserNickName();
        this.postType = post.getPostType();
        this.like = post.getLikes();
        this.views = post.getViews();

        return this;
    }

}
