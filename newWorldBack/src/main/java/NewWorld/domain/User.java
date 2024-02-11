package NewWorld.domain;

import NewWorld.MemberType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * 2024.01.12 jeonil
 * 회원
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User implements UserDetails {

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

    private int point;

    private int attendance;

    private MemberType memberType;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Quiz> quizList;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Post> postList;

    @Builder
    public User(Long id, String name, String userId, String nickname, String phoneNumber, String userPassword, String birthday, int point, int attendance, MemberType memberType, List<Quiz> quizList, List<Post> postList) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.userPassword = userPassword;
        this.birthday = birthday;
        this.point = point;
        this.attendance = attendance;
        this.memberType = memberType;
        this.quizList = quizList;
        this.postList = postList;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.userPassword;
    }

    @Override
    public String getUsername() {
        return this.userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
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
