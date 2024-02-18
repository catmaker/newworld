package NewWorld.dto;

import NewWorld.QuizDifficulty;
import NewWorld.domain.Quiz;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class QuizDto {

    private Long quizId;

    private String quizTitle;

    private String quizDetail;

    private List<String> hints;

    private String maker;

    private String makeDate;

    private String answer;

    private QuizDifficulty quizDifficulty;

    @Builder
    public QuizDto(Long quizId, String quizTitle, String quizDetail, List<String> hints, String maker, String makeDate, String answer, QuizDifficulty quizDifficulty) {
        this.quizId = quizId;
        this.quizTitle = quizTitle;
        this.quizDetail = quizDetail;
        this.hints = hints;
        this.maker = maker;
        this.makeDate = makeDate;
        this.answer = answer;
        this.quizDifficulty = quizDifficulty;
    }
}
