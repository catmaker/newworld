package NewWorld.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostLike {

    @Id
    @GeneratedValue
    @Column(name = "post_like_id")
    private Long id;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Builder
    public PostLike(Long id, User user, Post post) {
        this.id = id;
        this.user = user;
        this.post = post;
    }

    public static PostLike of(User user, Post post){
       return PostLike.builder()
                .post(post)
                .user(user)
                .build();
    }

}
