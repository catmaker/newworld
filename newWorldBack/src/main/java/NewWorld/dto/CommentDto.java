package NewWorld.dto;

import NewWorld.domain.Comment;
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

    public CommentDto toDto(Comment comment){
        this.commentId = comment.getId();
        this.comment = comment.getComment();
        this.makedDate = comment.getMakedDate();
        this.nickName = comment.getUserNickName();
        return this;
    }
}
