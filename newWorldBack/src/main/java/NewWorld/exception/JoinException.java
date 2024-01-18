package NewWorld.exception;

import lombok.extern.slf4j.Slf4j;

/**
 * 2024.01.14
 * 회원가입 에러 처리
 */
@Slf4j
public class JoinException extends Exception{
    public JoinException(String message) {
        super(message);
    }
}
