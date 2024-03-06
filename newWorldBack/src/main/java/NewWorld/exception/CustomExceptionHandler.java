package NewWorld.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(CustomError.class)
    protected ResponseEntity<ErrorResponseEntity> handleCustomException(CustomError error){
        return ErrorResponseEntity.toResponse(error.getErrorCode());
    }
}
