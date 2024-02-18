package NewWorld.domain;

import NewWorld.MemberType;
import NewWorld.QuizDifficulty;
import NewWorld.dto.QuizDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * 2024.01.12 jeonil
 * 퀴즈
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quiz {

    @Id
    @GeneratedValue
    @Column(name = "quiz_id")
    private Long id;

    private String title;

    private String detail;
    @Enumerated
    private QuizDifficulty quizDifficulty;

    private String answer;

    private String maker;

    private String makedDate;

    @OneToMany(cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Hint> hintList;

    @Builder
    public Quiz(Long id, String title, String detail, QuizDifficulty quizDifficulty, String answer, String maker, String makedDate, List<Hint> hintList) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.quizDifficulty = quizDifficulty;
        this.answer = answer;
        this.maker = maker;
        this.makedDate = makedDate;
        this.hintList = hintList;
    }

    public QuizDto of(Quiz quiz) {
        List<Hint> hints = quiz.getHintList();
        List<String> hintsforDto = new ArrayList<>();

        for (Hint hint : hints) {
            String h = hint.getHint();
            hintsforDto.add(h);
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

    public Quiz updateQuiz(QuizDto quizDto){
        this.title = quizDto.getQuizTitle();
        this.detail = quizDto.getQuizDetail();
        this.quizDifficulty = quizDto.getQuizDifficulty();
        this.answer = quizDto.getAnswer();
        return this;
    }
}
