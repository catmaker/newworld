package NewWorld.dto;

import NewWorld.QuizDifficulty;
import NewWorld.domain.Quiz;
import NewWorld.domain.User;
import NewWorld.domain.UserQuizSolvedDate;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SolvedQuizDto {

    private String puzzleTitle;

    private QuizDifficulty puzzleDifficulty;

    private String puzzleClearDate;

    @Builder
    public SolvedQuizDto(String puzzleTitle, QuizDifficulty puzzleDifficulty, String puzzleClearDate) {
        this.puzzleTitle = puzzleTitle;
        this.puzzleDifficulty = puzzleDifficulty;
        this.puzzleClearDate = puzzleClearDate;
    }

    public static SolvedQuizDto of (UserQuizSolvedDate userQuizSolvedDate){
        SolvedQuizDto solvedQuizDto = SolvedQuizDto.builder()
                .puzzleTitle(userQuizSolvedDate.getQuiz().getTitle())
                .puzzleDifficulty(userQuizSolvedDate.getQuiz().getQuizDifficulty())
                .puzzleClearDate(userQuizSolvedDate.getSolvedTime())
                .build();

        return solvedQuizDto;
    }
}
