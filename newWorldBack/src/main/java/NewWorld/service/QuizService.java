package NewWorld.service;

import NewWorld.domain.Quiz;
import NewWorld.dto.QuizDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface QuizService {

    QuizDto getQuiz(String quizTitle, String maker);
    Page<Quiz> getQuizzes(Pageable pageable);
    QuizDto quizMake(QuizDto quizDto, String quiz);
    void deleteQuiz(QuizDto quizDto, String quiz);
    void updateQuiz(QuizDto quizDto, String quiz);
    String checkAnswer(QuizDto quizDto, String answer);
}
