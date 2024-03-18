package NewWorld.controller;

import NewWorld.dto.CheckDto;
import NewWorld.dto.LoginDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;
import NewWorld.exception.ErrorCode;
import NewWorld.service.LoginService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/loginMember")
    public ResponseEntity<UserDto> login(@RequestBody LoginDto loginDto){
        UserDto result = null;

        if (loginDto.getUserId() == null || loginDto.getUserPassword() == null) {
            return null;
        }

        try {
            UserDto user = loginService.login(loginDto.getUserId(), loginDto.getUserPassword());

            if (user == null) {
                return null;
            }
            result = user;
        } catch (Exception e) {
            return null;
        }
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/passwordCheck")
    public  ResponseEntity<ErrorCode> passwordCheck(@RequestBody CheckDto checkDto) throws CustomError {
        ErrorCode result = loginService.checkUserPw(checkDto);

        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PostMapping("/changePassword")
    public  ResponseEntity<ErrorCode> chagePassword(@RequestBody CheckDto checkDto) throws CustomError {
        ErrorCode result = loginService.chagePassword(checkDto);

        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PostMapping("/findUserId")
    public  ResponseEntity<String> findUserId(@RequestBody CheckDto checkDto) throws CustomError {
        String result = loginService.findUserId(checkDto);
        return ResponseEntity.ok().body(result);
    }
}
