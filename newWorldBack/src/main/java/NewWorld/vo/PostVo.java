package NewWorld.vo;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * 2024.01.12 jeonil
 * 게시물
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostVo {

    @Id
    @GeneratedValue
    @Column(name = "post_vo_id")
    private Long id;

    private String title;

    private String detail;

    private Date makedDate;

    private String userNickName;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<CommentVo> commentVoList;

    @Builder
    public PostVo(Long id, String title, String detail, Date makedDate, String userNickName, List<CommentVo> commentVoList) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.makedDate = makedDate;
        this.userNickName = userNickName;
        this.commentVoList = commentVoList;
    }
}
