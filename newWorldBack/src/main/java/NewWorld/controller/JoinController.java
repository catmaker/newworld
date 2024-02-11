package NewWorld.controller;

import NewWorld.dto.UserDto;
import NewWorld.exception.JoinException;
import NewWorld.exception.LoginException;
import NewWorld.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
@Slf4j
public class JoinController {

    private final UserService userService;

    @PostMapping(value = "/signUp")
    @ResponseBody
    public String join(@RequestBody UserDto userDto) throws JoinException, LoginException {
        String name = userDto.getName();
        String joinCheck = userService.join(userDto);
        return joinCheck;
    }
}
