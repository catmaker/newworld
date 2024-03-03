package NewWorld.domain;

import NewWorld.PostType;
import NewWorld.dto.PostDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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

    private LocalDateTime makedDate;

    private String userNickName;

    //조회수
    private int views;
    //좋아요
    private  int likes;
    //종류 (기타,질문)
    @Enumerated(EnumType.STRING)
    private PostType postType;

    @OneToOne(cascade = CascadeType.PERSIST, orphanRemoval = true)
    private ImageFile imageFile;

    @OneToMany(cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Comment> commentList;

    @Builder
    public Post(Long id, String title, String detail, LocalDateTime makedDate, String userNickName, int views, int likes, PostType postType, ImageFile imageFile, List<Comment> commentList) {
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

    public static Post of(PostDto postDto){
        return  Post.builder().
                title(postDto.getTitle()).
                detail(postDto.getDetail()).
                makedDate(LocalDateTime.now()).
                postType(postDto.getPostType()).
                likes(0).
                views(0).
                userNickName(postDto.getNickname()).build();
    }

    /**
     * 댓글 등록
     */
    public Post setComment(Comment comment){
        if (commentList == null) {
            commentList = List.of(comment);
        } else {
            commentList.add(comment);
        }

        return this;
    }

    public void deleteComment(Long commentId){
        commentList.removeIf(h->commentList.stream().
                filter(s->s.getId().equals(commentId)).
                findFirst().isPresent());
    }
    /**
     * 2024.01.28 jeonil
     * 글 수정
     */
    public Post chagePost(PostDto postDto){
        this.title = postDto.getTitle();
        this.detail = postDto.getDetail();
        this.postType = postDto.getPostType();

        return this;
    }

    public int addLike(){
        this.likes = this.likes + 1;

        return this.likes;
    }

    public void addview(){
        this.views = this.views + 1;
    }
}
