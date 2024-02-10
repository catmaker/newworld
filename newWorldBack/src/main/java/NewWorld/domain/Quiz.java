package NewWorld.domain;

import NewWorld.MemberType;
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

    private String difficultly;

    private String answer;

    private String maker;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Hint> hintList;

    //문제 푼사람

    @Builder
    public Quiz(Long id, String quiz, String difficultly, String answer, String maker, List<Hint> hintList) {
        this.id = id;
        this.quiz = quiz;
        this.difficultly = difficultly;
        this.answer = answer;
        this.maker = maker;
        this.hintList = hintList;
    }
}
