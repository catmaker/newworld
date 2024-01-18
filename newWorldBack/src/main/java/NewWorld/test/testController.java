package NewWorld.test;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
public class testController {

    @GetMapping("/test")
    @ResponseBody
    public String test(HttpServletRequest request) {
    return "성공";
    }
}
