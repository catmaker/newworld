package NewWorld.controller;

import NewWorld.exception.LoginException;
import NewWorld.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequiredArgsConstructor
@Slf4j
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/loginMember")
    public String login(HttpServletRequest request) throws LoginException {
        log.info("연결");
//        if(userId == null || userPassword == null){
//            return "f";
//        }
//        String login = loginService.login(userId, userPassword);

        return null;
    }
}
