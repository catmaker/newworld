package NewWorld.dto;

import NewWorld.domain.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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

    /**
     * user기본정보 ->dto
     * @param user
     */
    public UserDto usertoDto(User user){

        this.name = user.getName();
        this.userId = user.getUserId();
        this.userPassword = user.getUserPassword();
        this.nickname = user.getNickname();
        this.phoneNumber = user.getPhoneNumber();
        this.birthday = user.getBirthday();

        return this;
    }

    /**
     * user기본정보 ->dto
     * @param user
     */
    public UserDto basicInfo(User user){

        this.name = user.getName();
        this.nickname = user.getNickname();
        this.phoneNumber = user.getPhoneNumber();
        this.birthday = user.getPhoneNumber();

        return this;
    }
}
