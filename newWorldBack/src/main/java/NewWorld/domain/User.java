package NewWorld.domain;

import NewWorld.MemberType;
import NewWorld.dto.UserDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@DynamicUpdate
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue
    @Column(name = "users_id")
    private Long id;

    private String name;

    @Column(unique = true, nullable = false, updatable = false)
    private String userId;

    @Version
    private Long version;

    private String nickname;

    private String phoneNumber;

    private String userPassword;

    private String birthday;

    private int point;

    private LocalDateTime loginDate;

    private int attendance;

    private MemberType memberType;

    private LocalDateTime joinDate;

    @OneToOne(cascade = CascadeType.PERSIST, orphanRemoval = true)
    private ImageFile imageFile;

    @OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Post> postList;

    @Builder
    public User(Long id, String name, String userId, String nickname, String phoneNumber, String userPassword, String birthday, int point, LocalDateTime loginDate, int attendance, MemberType memberType, LocalDateTime joinDate, ImageFile imageFile, List<Post> postList) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.userPassword = userPassword;
        this.birthday = birthday;
        this.point = point;
        this.loginDate = loginDate;
        this.attendance = attendance;
        this.memberType = memberType;
        this.joinDate = joinDate;
        this.imageFile = imageFile;
        this.postList = postList;
    }

    public static User of (UserDto joinInfo){
        return  User.builder().
                userId(joinInfo.getUserId()).
                userPassword(joinInfo.getUserPassword()).
                name(joinInfo.getName()).
                nickname(joinInfo.getNickname()).
                phoneNumber(joinInfo.getPhoneNumber()).
                point(0).
                attendance(0).
                birthday(joinInfo.getBirthday()).
                joinDate(LocalDateTime.now()).
                loginDate(LocalDateTime.now()).
                build();
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
     * @param nickname
     */
    public User changeNickname(String nickname){
        this.nickname = nickname;
        return this;
    }

    /**
     * 출석체크 변경
     */
    public int checkAttendance(){
        this.attendance = this.attendance + 1;

        return this.attendance;
    }

    /**
     * 프로필 이미지 변경
     */
    public void saveImage(ImageFile imageFile){
        this.imageFile = imageFile;
    }

    public void addPoint(){
        this.point = this.point + 20;
    }

    public void changePassword(String newPassword) {
        this.userPassword = newPassword;
    }

    public void deletePost(Post post){
        this.postList.removeIf(s->s.equals(post));
    }
}
