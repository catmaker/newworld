package NewWorld.controller;

import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;
import NewWorld.exception.ErrorCode;
import NewWorld.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class JoinController {

    private final UserService userService;

    @PostMapping(value = "/join")
    public ResponseEntity<ErrorCode> join(@Valid @RequestBody UserDto userDto) throws CustomError {
        ErrorCode result = userService.join(userDto);
        return ResponseEntity.status(result.getStatus()).body(result);
    }
}
