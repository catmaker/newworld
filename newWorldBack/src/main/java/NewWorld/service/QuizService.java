package NewWorld.service;

import NewWorld.domain.Quiz;
import NewWorld.dto.QuizDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface QuizService {

    QuizDto getQuiz(String quizTitle, String maker);
    Page<Quiz> getQuizzes(Pageable pageable);
    String quizMake(QuizDto quizDto, String nickname);
    void deleteQuiz(QuizDto quizDto, String nickname);
    void updateQuiz(QuizDto quizDto, String nickname);
    String checkAnswer(QuizDto quizDto, String answer);
}
