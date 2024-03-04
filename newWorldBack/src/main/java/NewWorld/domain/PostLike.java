package NewWorld.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostLike {

    @Id
    @GeneratedValue
    @Column(name = "post_like_id")
    private Long id;

    @OneToOne
    private User user;

    @Builder
    public PostLike(Long id, User user) {
        this.id = id;
        this.user = user;
    }

    public static PostLike of(User user){
       return PostLike.builder()
                .user(user)
                .build();
    }
}
