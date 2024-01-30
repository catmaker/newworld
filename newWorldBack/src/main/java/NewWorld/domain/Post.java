package NewWorld.domain;

import NewWorld.dto.PostDto;
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
public class Post {

    @Id
    @GeneratedValue
    @Column(name = "post_id")
    private Long id;

    private String title;

    private String detail;

    private Date makedDate;

    private String userNickName;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Comment> commentList;

    @Builder
    public Post(Long id, String title, String detail, Date makedDate, String userNickName, List<Comment> commentList) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.makedDate = makedDate;
        this.userNickName = userNickName;
        this.commentList = commentList;
    }

    /**
     * 댓글 등록
     */
    public Post setComment(boolean comments){
        this.commentList = commentList;
        return this;
    }
    /**
     * 2024.01.28 jeonil
     * 글 수정
     */
    public Post chagePost(PostDto postDto){
        this.title = postDto.getTitle();
        this.detail = postDto.getDetail();

        return this;
    }
}
