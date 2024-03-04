package NewWorld.dto;

import NewWorld.domain.Comment;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

/**
 *
 */
@Getter
@Setter
public class CommentDto {

    private Long postId;

    private Long commentId;


    @NotEmpty(message = "댓글을 입력하지 않았습니다.")
    private String comment;

    @NotNull(message = "닉네임을 받아오지 못하였습니다.")
    private String userNickName;

    private LocalDateTime makedDate;

    @Builder
    public CommentDto(Long postId, Long commentId, String comment, String nickName, LocalDateTime makedDate) {
        this.postId = postId;
        this.commentId = commentId;
        this.comment = comment;
        this.userNickName = nickName;
        this.makedDate = makedDate;
    }

    public static CommentDto of(Comment comment){
       return CommentDto.builder()
                .commentId(comment.getId())
                .comment(comment.getComment())
                .nickName(comment.getUserNickName())
                .makedDate(comment.getMakedDate())
                .build();
    }
}
