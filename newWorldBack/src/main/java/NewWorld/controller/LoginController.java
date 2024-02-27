package NewWorld.controller;

import NewWorld.dto.LoginDto;
import NewWorld.dto.UserDto;
import NewWorld.service.LoginService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/loginMember")
    public UserDto login(@RequestBody LoginDto loginDto){
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
        return result;
    }
}
