package NewWorld.dto;

import NewWorld.domain.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 2024-01-23 jeonil
 * User 정보
 */
@Getter
@Setter
public class UserDto {

    @NotBlank
    @NotEmpty
    @NotNull
    private String name;

    @NotBlank
    @NotEmpty
    @NotNull
    private String userId;

    @NotBlank
    @NotEmpty
    @NotNull
    private String nickname;

    @NotBlank
    @NotEmpty
    @NotNull
    private String phoneNumber;

    @NotBlank
    @NotEmpty
    @NotNull
    private String userPassword;

    @NotBlank
    @NotEmpty
    @NotNull
    private String birthday;

    @Builder
    public UserDto(String name, String userId, String nickname, String phoneNumber, String userPassword, String birthday) {
        this.name = name;
        this.userId = userId;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.userPassword = userPassword;
        this.birthday = birthday;
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
                .build();
        return userDto;
    }
}
