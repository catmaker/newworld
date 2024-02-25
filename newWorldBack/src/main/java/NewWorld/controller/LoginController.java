package NewWorld.controller;

import NewWorld.MemberSession;
import NewWorld.domain.User;
import NewWorld.dto.LoginDto;
import NewWorld.dto.LoginSessionDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.LoginException;
import NewWorld.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/loginMember")
    public UserDto login(@RequestBody LoginDto loginDto, HttpServletRequest request) throws LoginException {
        HttpSession session = request.getSession();

        if (loginDto.getUserId() == null || loginDto.getUserPassword() == null) {
            return null;
        }
        UserDto result = null;
        try {
            UserDto user = loginService.login(loginDto.getUserId(), loginDto.getUserPassword());

            if (user == null) {
                return null;
            }

            result = user;

            LoginSessionDto loginSession = LoginSessionDto.builder()
                    .userNickname(user.getNickname())
                    .userName(user.getName())
                    .build();

            session.setAttribute(MemberSession.LOGIN_MEMBER, loginSession);


        } catch (Exception e) {
            return null;
        }
        return result;
    }
}
