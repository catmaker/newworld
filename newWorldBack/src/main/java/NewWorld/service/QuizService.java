package NewWorld.service;

import NewWorld.dto.QuizDto;

public interface QuizService {

    QuizDto getQuiz(String quizTitle, String maker);
    QuizDto quizMake(QuizDto quizDto, String quiz);
    void deleteQuiz(QuizDto quizDto, String quiz);
    void updateQuiz(QuizDto quizDto, String quiz);
    String checkAnswer(QuizDto quizDto, String answer);
}
