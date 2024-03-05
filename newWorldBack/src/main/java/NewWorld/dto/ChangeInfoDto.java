package NewWorld.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeInfoDto {
   private String userId;

   private String  nickname;
   private String  newNickname;

   private String newPassword;
   private String originPassword;
}
