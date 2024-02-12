package NewWorld.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginSessionDto {
    private String userNickname;
    private String userName;

    @Builder
    public LoginSessionDto(String userNickname, String userName) {
        this.userNickname = userNickname;
        this.userName = userName;
    }
}
