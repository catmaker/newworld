package NewWorld.domain;

import NewWorld.PostType;
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

    //조회수
    private int views;
    //좋아요
    private  int likes;
    //종류 (기타,질문)
    private PostType postType;

    @OneToOne(cascade = CascadeType.PERSIST, orphanRemoval = true)
    private ImageFile imageFile;

    @OneToMany(cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Comment> commentList;

    @Builder
    public Post(Long id, String title, String detail, Date makedDate, String userNickName, int views, int likes, PostType postType, ImageFile imageFile, List<Comment> commentList) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.makedDate = makedDate;
        this.userNickName = userNickName;
        this.views = views;
        this.likes = likes;
        this.postType = postType;
        this.imageFile = imageFile;
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
