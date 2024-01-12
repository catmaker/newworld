package NewWorld.vo;

import NewWorld.Maker;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.sql.results.graph.Fetch;

import java.util.List;

/**
 * 2024.01.12 jeonil
 * 퀴즈
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuizVo {

    @Id
    @GeneratedValue
    @Column(name = "quiz_vo_id")
    private Long id;

    private String quiz;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<AnswerVo> answerVoList;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<HintVo> hintVoList;

    @Enumerated(value = EnumType.STRING)
    private Maker maker;

    @Builder
    public QuizVo(Long id, String quiz, List<AnswerVo> answerVoList, List<HintVo> hintVoList, Maker maker) {
        this.id = id;
        this.quiz = quiz;
        this.answerVoList = answerVoList;
        this.hintVoList = hintVoList;
        this.maker = maker;
    }
}
