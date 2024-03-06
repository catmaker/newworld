package NewWorld.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
@Builder
public class ErrorResponseEntity {

    private int status;
    private String code;
    private String message;

    public static ResponseEntity<ErrorResponseEntity> toResponse(ErrorCode e){
        return ResponseEntity
                .status(e.getStatus())
                .body(ErrorResponseEntity.builder()
                        .status(e.getStatus().value())
                        .code(e.name())
                        .message(e.getMessage())
                        .build());
    }
}
