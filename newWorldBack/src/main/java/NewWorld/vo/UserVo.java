package NewWorld.vo;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 2024.01.12 jeonil
 * 회원
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserVo {

    @Id
    @GeneratedValue
    @Column(name = "user_vo_id")
    private Long id;

    private String name;

    private String userId;

    private String userPassword;

    private String birthday;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<GameVo> gameVoList;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<PostVo> postVoList;

    @Builder
    public UserVo(Long id, String name, String userId, String userPassword, String birthday, List<GameVo> gameVoList, List<PostVo> postVoList) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.userPassword = userPassword;
        this.birthday = birthday;
        this.gameVoList = gameVoList;
        this.postVoList = postVoList;
    }
}
