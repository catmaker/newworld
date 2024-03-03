package NewWorld.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeInfoDto {
   private String userId;
   private String currentPassword;
   private String  newPassword;
   private String  nickname;

}
