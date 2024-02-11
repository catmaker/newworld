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
    private String comment;

    private String userNickName;

    private LocalDateTime makedDate;

    public CommentDto toDto(Comment comment){
        this.comment = comment.getComment();
        this.makedDate = comment.getMakedDate();
        this.userNickName = comment.getUserNickName();
        return this;
    }
}
