package NewWorld.exception;

import lombok.extern.slf4j.Slf4j;

/**
 * 2024.01.14
 * 로그인 에러 처리
 */
@Slf4j
public class LoginException extends Exception{
    public LoginException(String message) {
        super(message);
    }
}
