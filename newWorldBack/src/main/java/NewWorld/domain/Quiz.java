package NewWorld.domain;

import NewWorld.MemberType;
import NewWorld.QuizDifficulty;
import NewWorld.dto.HintDto;
import NewWorld.dto.QuizDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

/**
 * 2024.01.12 jeonil
 * 퀴즈
 */
@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quiz {

    @Id
    @GeneratedValue
    @Column(name = "quiz_id")
    private Long id;

    private String title;

    @Column(length = 500)
    private String detail;

    @Enumerated(EnumType.STRING)
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

    public static Quiz of(QuizDto quizDto, List<Hint> hints) {

        Quiz newQuiz = Quiz.builder()
                .title(quizDto.getQuizTitle())
                .detail(quizDto.getQuizDetail())
                .answer(quizDto.getAnswer())
                .hintList(hints)
                .maker(quizDto.getMaker())
                .quizDifficulty(quizDto.getQuizDifficulty())
                .build();

        return newQuiz;
    }

    public Quiz updateQuiz(QuizDto quizDto){
        this.title = quizDto.getQuizTitle();
        this.detail = quizDto.getQuizDetail();
        this.quizDifficulty = quizDto.getQuizDifficulty();
        return this;
    }

    public void addHint(Hint hint){
        if (this.hintList == null)
            this.hintList = new ArrayList<>();

        boolean addFlag = true;
        for (Hint one : hintList){

            if (one.equals(hint)){
                hint.changeHint(hint.getHint());
                addFlag = false;
            }
        }

        if(addFlag){
            this.hintList.add(hint);
        }
    }

    public void deleteHint(List<Hint> hints){
        hintList.removeIf(h->hints.stream().
                filter(s->s.equals(h)).
                findFirst().isPresent());
    }
    public void deleteAllHint(List<Hint> hints){
        this.hintList.removeAll(hints);
    }

}
