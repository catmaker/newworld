package NewWorld.dto;

import NewWorld.QuizDifficulty;
import NewWorld.domain.Hint;
import NewWorld.domain.Quiz;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class QuizDto {

    private Long quizId;

    private String nickname;

    private String name;

    private String quizTitle;

    private String quizDetail;

    private List<HintDto> hints;

    private String maker;

    private String makeDate;

    private String answer;

    private QuizDifficulty quizDifficulty;

    @Builder
    public QuizDto(Long quizId, String quizTitle, String quizDetail, List<HintDto> hints, String maker, String makeDate, String answer, QuizDifficulty quizDifficulty) {
        this.quizId = quizId;
        this.quizTitle = quizTitle;
        this.quizDetail = quizDetail;
        this.hints = hints;
        this.maker = maker;
        this.makeDate = makeDate;
        this.answer = answer;
        this.quizDifficulty = quizDifficulty;
    }

    public static QuizDto of(Quiz quiz) {
        List<Hint> hints = quiz.getHintList();
        List<HintDto> hintsforDto = new ArrayList<>();

        for (Hint hint : hints) {
            hintsforDto.add(HintDto.of(hint));
        }

        QuizDto quizDto = QuizDto.builder()
                .quizTitle(quiz.getTitle())
                .quizDetail(quiz.getDetail())
                .hints(hintsforDto)
                .makeDate(quiz.getMakedDate())
                .quizDifficulty(quiz.getQuizDifficulty())
                .maker(quiz.getMaker())
                .answer(quiz.getAnswer())
                .build();

        return quizDto;
    }
}
