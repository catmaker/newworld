package NewWorld.domain;

import NewWorld.dto.CommentDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * 2024.01.12 jeonil
 * 댓글
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {

    @Id
    @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    private String comment;

    private String userNickName;

    private LocalDateTime makedDate;

    @Builder
    public Comment(Long id, String comment, String userNickName, LocalDateTime makedDate) {
        this.id = id;
        this.comment = comment;
        this.userNickName = userNickName;
        this.makedDate = makedDate;
    }

    public static Comment of(CommentDto commentDto){
        return Comment.builder()
                .comment(commentDto.getComment())
                .makedDate(LocalDateTime.now())
                .userNickName(commentDto.getUserNickName())
                .build();
    }

    /**
     * 댓글 수정
     */
    public Comment modifyComment(String newComment){
        this.comment = newComment;
        return this;
    }
}
