package NewWorld.dto;

import NewWorld.QuizDifficulty;
import NewWorld.domain.Hint;
import NewWorld.domain.Quiz;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class QuizDto {

    private Long quizId;

    @NotEmpty(message = "닉네임을 받아오지 못하였습니다.")
    private String nickname;

    @NotEmpty(message = "이름을 받아오지 못하였습니다.")
    private String name;

    @NotEmpty(message = "제목을 받아오지 못하였습니다.")
    private String quizTitle;

    @NotEmpty(message = "퀴즈내용을 받아오지 못하였습니다.")
    private String quizDetail;

    private List<HintDto> hints;

    @NotEmpty(message = "닉네임(maker)을 받아오지 못하였습니다.")
    private String maker;

    private String makeDate;

    @NotEmpty(message = "정답을 입력하지 않았습니다.")
    private String answer;

    @NotNull(message = "난이도를 설정하지 않습니다.")
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
