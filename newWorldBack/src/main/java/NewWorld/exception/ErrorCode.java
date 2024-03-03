package NewWorld.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    SAME_PASSWORD(HttpStatus.CONFLICT,"새로운 비밀번호를 입력바랍니다"),
    NOT_CHANGE(HttpStatus.CONFLICT,"변경된 정보가 없습니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다.");

    private static HttpStatus status;
    private static String message;


    ErrorCode(HttpStatus httpStatus, String s) {

    }
}
