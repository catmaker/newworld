package NewWorld.test;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class testController {

    @GetMapping("test")
    public String test(HttpServletRequest request) {

    return "성공";
    }
}
