package NewWorld.controller;

import NewWorld.domain.Quiz;
import NewWorld.dto.QuizDto;
import NewWorld.exception.CustomError;
import NewWorld.service.QuizService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static NewWorld.common.ResponseEntityConstants.RESPONSE_ENTITY_NO_CONTENT;

@RestController
@RequiredArgsConstructor
public class GameController {

    private final QuizService quizService;

    @PostMapping("/postMakeQuiz")
    public ResponseEntity<QuizDto> makeQuiz(@Valid @RequestBody QuizDto quizDto) throws CustomError {
        QuizDto result = quizService.quizMake(quizDto);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/getQuiz")
    public ResponseEntity<QuizDto> findQuiz(@RequestBody QuizDto quizDto) {
        QuizDto result = quizService.getQuiz(quizDto);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/getPuzzleList")
    public ResponseEntity<Page<Quiz>> findQuizzes(@RequestParam(required = false, defaultValue = "0", value = "page") int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        Page<Quiz> result = quizService.getQuizzes(pageable);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/postCheckQuiz")
    public ResponseEntity<String> checkQuizAnswer(@RequestBody QuizDto quizDto) throws CustomError {
        String result = quizService.checkAnswer(quizDto);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/updateQuiz")
    public ResponseEntity<QuizDto> updateQuiz(@RequestBody QuizDto quizDto) throws CustomError {
        QuizDto result = quizService.updateQuiz(quizDto);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/deleteQuiz")
    public ResponseEntity<HttpStatus> deleteQuiz(@RequestBody QuizDto quizDto) throws CustomError {
        quizService.deleteQuiz(quizDto);
        return RESPONSE_ENTITY_NO_CONTENT;

    }
}
