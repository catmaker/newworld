package NewWorld.dto;

import NewWorld.domain.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;

/**
 * 2024-01-23 jeonil
 * User 정보
 */
@Getter
@Setter
public class UserDto {

    @NotEmpty(message = "이름을 입력하지 않았습니다")
    private String name;

    private String userId;

    @NotEmpty(message = "닉네임을 입력하지 않았습니다")
    private String nickname;

    @NotEmpty(message = "핸드폰번호을 입력하지 않았습니다")
    private String phoneNumber;

    @NotEmpty(message = "비밀번호를 입력하지 않았습니다")
    private String userPassword;

    @NotEmpty(message = "생일을 입력하지 않았습니다")
    private String birthday;

    private String signupDate;

    private int attendance;

    private int puzzleCount;

    private int point;

    private String imageFilePath;


    @Builder
    public UserDto(String name, String userId, String nickname, String phoneNumber, String userPassword, String birthday, String signupDate, int attendance, int puzzleCount, int point, String imageFile) {
        this.name = name;
        this.userId = userId;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.userPassword = userPassword;
        this.birthday = birthday;
        this.signupDate = signupDate;
        this.attendance = attendance;
        this.puzzleCount = puzzleCount;
        this.point = point;
        this.imageFilePath = imageFile;
    }

    /**
     * user기본정보 ->dto
     * @param user
     */
    public static UserDto of(User user){
        UserDto userDto = UserDto.builder()
                .userId(user.getUserId())
                .userPassword(user.getUserPassword())
                .name(user.getName())
                .phoneNumber(user.getPhoneNumber())
                .birthday(user.getBirthday())
                .nickname(user.getNickname())
                .point(user.getPoint())
                .attendance(user.getAttendance())
                .signupDate(user.getJoinDate().toLocalDate().toString())
                .build();
        return userDto;
    }

    public UserDto hideInfo(){
        this.userPassword = "";
        this.phoneNumber = "";
        this.birthday = "";
        return this;
    }
}
