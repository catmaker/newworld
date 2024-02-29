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
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class JoinController {

    private final UserService userService;

    @PostMapping(value = "/join")
    public String join(@RequestBody UserDto userDto) {
        String joinCheck = userService.join(userDto);
        return joinCheck;
    }
}
