package NewWorld.controller;

import NewWorld.dto.UserDto;
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
    @PostMapping(value = "/signUp")
    @ResponseBody
    public String join(@RequestBody UserDto userDto){
        String name = userDto.getName();
        log.info("name={}",name);
        return "aa";
    }
}
