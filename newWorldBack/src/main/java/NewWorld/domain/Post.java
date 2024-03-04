package NewWorld.domain;

import NewWorld.PostType;
import NewWorld.dto.PostDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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

    @OneToMany(cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<PostLike> postPostLikes;
    //종류 (기타,질문)
    @Enumerated(EnumType.STRING)
    private PostType postType;

    @OneToOne(cascade = CascadeType.PERSIST, orphanRemoval = true)
    private ImageFile imageFile;

    @OneToMany(cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Comment> commentList;

    @Builder
    public Post(Long id, String title, String detail, LocalDateTime makedDate, String userNickName, int views, List<PostLike> postLikes, PostType postType, ImageFile imageFile, List<Comment> commentList) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.makedDate = makedDate;
        this.userNickName = userNickName;
        this.views = views;
        this.postPostLikes = postLikes;
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

    public boolean checkLike(User user){
        boolean result = this.postPostLikes.stream().filter(s -> s.getUser().equals(user)).findFirst().isPresent();

        return result;
    }

    public List<PostLike> addLike(PostLike postLike){
        if(this.postPostLikes == null){
           this.postPostLikes = List.of(postLike);
        }else{
            this.postPostLikes.add(postLike);
        }

        return this.postPostLikes;
    }

    public List<PostLike> minusLike(User user){
        this.postPostLikes.removeIf(l->this.postPostLikes.stream()
                        .filter(s->s.getUser().getId().equals(user.getId()))
                .findFirst().isPresent());
        return this.postPostLikes;
    }

    public void addview(){
        this.views = this.views + 1;
    }
}
