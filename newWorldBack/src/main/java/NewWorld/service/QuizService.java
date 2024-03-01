package NewWorld.service;

import NewWorld.domain.Quiz;
import NewWorld.dto.QuizDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface QuizService {

    QuizDto getQuiz(QuizDto quizDto);
    Page<Quiz> getQuizzes(Pageable pageable);
    String quizMake(QuizDto quizDto, String nickname);
    String deleteQuiz(QuizDto quizDto);
    void updateQuiz(QuizDto quizDto);
    String checkAnswer(QuizDto quizDto);
}
