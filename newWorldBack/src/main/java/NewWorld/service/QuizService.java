package NewWorld.service;

import NewWorld.domain.Quiz;
import NewWorld.dto.QuizDto;
import NewWorld.exception.CustomError;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface QuizService {

    QuizDto getQuiz(QuizDto quizDto);
    Page<Quiz> getQuizzes(Pageable pageable);
    QuizDto quizMake(QuizDto quizDto) throws CustomError;
    void deleteQuiz(QuizDto quizDto) throws CustomError;
    QuizDto updateQuiz(QuizDto quizDto) throws CustomError;
    String checkAnswer(QuizDto quizDto) throws CustomError;
}
