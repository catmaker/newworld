package NewWorld.controller;

import NewWorld.domain.Quiz;
import NewWorld.dto.QuizDto;
import NewWorld.service.QuizService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GameController {

    private final QuizService quizService;

    @PostMapping("/makeQuiz")
    public String makeQuiz(@RequestBody QuizDto quizDto, String nickName){
        String result = quizService.quizMake(quizDto, nickName);

        return result;
    }

    @PostMapping("/getQuiz")
    public QuizDto findQuiz(@RequestBody QuizDto quizDto){
        QuizDto quiz = quizService.getQuiz(quizDto.getQuizTitle(), quizDto.getMaker());
        return quiz;
    }

    @PostMapping("/getQuizzes")
    public Page<Quiz> findQuiz(@RequestParam(required = false, defaultValue = "0", value = "page") int pageNo){
        Pageable pageable = PageRequest.of(pageNo, 5);
        Page<Quiz> quizzes = quizService.getQuizzes(pageable);
        return quizzes;
    }

    @PostMapping("/checkQuizAnswer")
    public String checkQuizAnswer(@RequestBody QuizDto quizDto){
        String result = quizService.checkAnswer(quizDto);
        return result;
    }

}
