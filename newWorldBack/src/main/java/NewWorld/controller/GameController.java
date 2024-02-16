package NewWorld.controller;

import NewWorld.domain.Quiz;
import NewWorld.dto.QuizDto;
import NewWorld.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GameController {

    private final QuizService quizService;

    @PostMapping("/makeQuiz")
    public QuizDto makeQuiz(QuizDto quizDto, String nickName){
        QuizDto result = quizService.quizMake(quizDto, nickName);

        if(result != null){
            return result;
        }

        return null;
    }

    @PostMapping("/getQuiz")
    public QuizDto findQuiz(QuizDto quizDto){
        QuizDto result = quizService.getQuiz(quizDto.getQuizTitle(), quizDto.getMaker());
        return result;
    }
}
