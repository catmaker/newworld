package NewWorld.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * 2024.01.12 jeonil
 * 댓글
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentVo {

    @Id
    @GeneratedValue
    @Column(name = "comment_vo_id")
    private Long id;

    private String comment;

    private String userNickName;

    private Date makedDate;

    @Builder
    public CommentVo(Long id, String comment, String userNickName, Date makedDate) {
        this.id = id;
        this.comment = comment;
        this.userNickName = userNickName;
        this.makedDate = makedDate;
    }
}
