package NewWorld.domain;

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
public class User {

    @Id
    @GeneratedValue
    @Column(name = "users_id")
    private Long id;

    private String name;

    private String userId;

    private String nickname;

    private String phoneNumber;

    private String userPassword;

    private String birthday;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Game> gameList;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Post> postList;

    @Builder
    public User(Long id, String name, String userId, String nickname, String phoneNumber, String userPassword, String birthday, List<Game> gameList, List<Post> postList) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.userPassword = userPassword;
        this.birthday = birthday;
        this.gameList = gameList;
        this.postList = postList;
    }

    /**
     * user기본정보 업데이트
     * @param nickname
     * @param phoneNumber
     * @param birthday
     * @return
     */
    public User basicInfoUpdate(String nickname, String phoneNumber, String birthday){
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;

        return this;
    }

    /**
     * 비밀번호 변경
     * @param newPassword
     */
    public User changePassword(String newPassword){
        this.userPassword = newPassword;
        return this;
    }

}
