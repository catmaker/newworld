package NewWorld.dto;

import NewWorld.domain.Comment;
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

    private String comment;

    private String nickName;

    private LocalDateTime makedDate;

    @Builder
    public CommentDto(Long postId, Long commentId, String comment, String nickName, LocalDateTime makedDate) {
        this.postId = postId;
        this.commentId = commentId;
        this.comment = comment;
        this.nickName = nickName;
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
