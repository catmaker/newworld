package NewWorld.domain;

import NewWorld.Maker;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    private String quiz;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Answer> answerList;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Hint> hintList;

    @Enumerated(value = EnumType.STRING)
    private Maker maker;

    @Builder
    public Quiz(Long id, String quiz, List<Answer> answerList, List<Hint> hintList, Maker maker) {
        this.id = id;
        this.quiz = quiz;
        this.answerList = answerList;
        this.hintList = hintList;
        this.maker = maker;
    }
}
