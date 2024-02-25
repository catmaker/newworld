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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GameController {

    private final QuizService quizService;

    @PostMapping("/postCheckQuiz")
    public String makeQuiz(@RequestBody QuizDto quizDto, String nickName){
        try {
            String result = quizService.quizMake(quizDto, nickName);
            return result;
        }catch (Exception e){
            return "f";
        }
    }

    @GetMapping("/getQuiz")
    public QuizDto findQuiz(@RequestBody QuizDto quizDto){
        QuizDto quiz = quizService.getQuiz(quizDto.getQuizTitle(), quizDto.getMaker());
        return quiz;
    }

    @GetMapping("/getPuzzleList")
    public Page<Quiz> findQuizzes(@RequestParam(required = false, defaultValue = "0", value = "page") int pageNo){
        Pageable pageable = PageRequest.of(pageNo, 5);
        Page<Quiz> quizzes = quizService.getQuizzes(pageable);
        return quizzes;
    }

    @GetMapping("/postCheckPuzzle")
    public String checkQuizAnswer(@RequestBody QuizDto quizDto){
        try {
            String result = quizService.checkAnswer(quizDto);
            return result;
        }catch (Exception e){
            return "f";
        }
    }

    @PostMapping("/updateQuiz")
    public String updateQuiz(@RequestBody QuizDto quizDto){
        try {
            quizService.updateQuiz(quizDto);
            return "s";
        }catch (Exception e) {
            return "f";
        }
    }
    @PostMapping("/deletePuzzle")
    public String deleteQuiz(@RequestBody QuizDto quizDto){
        try {
            String s = quizService.deleteQuiz(quizDto);
            return s;
        }catch (Exception e) {
            return "f";
        }
    }
}
