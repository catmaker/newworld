package NewWorld.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseEntityConstants {
    public static final ResponseEntity<HttpStatus> RESPONSE_ENTITY_NO_CONTENT = ResponseEntity.status(
            HttpStatus.NO_CONTENT).build();
}
