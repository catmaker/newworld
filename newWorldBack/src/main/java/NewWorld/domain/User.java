package NewWorld.domain;

import NewWorld.MemberType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collection;
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

    private int point;

    private LocalDateTime loginDate;

    private int attendance;

    private MemberType memberType;

    private String joinDate;

    @OneToOne(cascade = CascadeType.PERSIST, orphanRemoval = true)
    private ImageFile imageFile;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Quiz> quizList;

    @OneToMany(cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Post> postList;


    @Builder
    public User(Long id, String name, String userId, String nickname, String phoneNumber, String userPassword, String birthday, int point, LocalDateTime loginDate, int attendance, MemberType memberType, String joinDate, ImageFile imageFile, List<Quiz> quizList, List<Post> postList) {
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
        this.quizList = quizList;
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

    public User addQuizList(Quiz quiz){

        if (this.quizList == null){
            this.quizList = List.of(quiz);
        }else{
            this.quizList.add(quiz);
        }


        return this;
    }

    public int checkAttendance(){
        this.attendance = this.attendance + 1;

        return this.attendance;
    }
    public void saveImage(ImageFile imageFile){
        this.imageFile = imageFile;
    }
}
