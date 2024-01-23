package NewWorld.exception;

/**
 * 2024.01.23 jeonil
 * user정보 조회 에러
 */
public class NotfindUserException extends Exception {
    public NotfindUserException(String message) {
        super(message);
    }
}
