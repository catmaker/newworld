package NewWorld.dto;

import NewWorld.PostType;
import NewWorld.domain.Comment;
import NewWorld.domain.Post;
import NewWorld.domain.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
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

    @NotBlank(message = "제목을 입력하지 않았습니다.")
    private String title;

    @NotBlank(message = "내용을 입력하지 않았습니다.")
    private String detail;

    private List<Comment> comments;

    private LocalDateTime makedDate;

    @NotBlank(message = "게시물종류를 입력하지 않았습니다.")
    private PostType postType;

    private int like;

    private int views;

    @Builder
    public PostDto(String nickname, String name, Long postId, String title, String detail, List<Comment> comments, LocalDateTime makedDate, PostType postType, int like, int views) {
        this.nickname = nickname;
        this.name = name;
        this.postId = postId;
        this.title = title;
        this.detail = detail;
        this.comments = comments;
        this.makedDate = makedDate;
        this.postType = postType;
        this.like = like;
        this.views = views;
    }

    /**
     * 게사판정보 ->dto
     * @param post
     */
    public static PostDto of(Post post){
       return PostDto.builder()
                .title(post.getTitle())
                .detail(post.getDetail())
                .comments(post.getCommentList() != null? post.getCommentList() : null)
                .postId(post.getId())
                .makedDate(post.getMakedDate())
                .like(post.getLikes())
                .postType(post.getPostType())
                .nickname(post.getUserNickName())
                .build();
    }

}
