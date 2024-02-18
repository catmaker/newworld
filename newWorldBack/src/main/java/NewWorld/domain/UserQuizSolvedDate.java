package NewWorld.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserQuizSolvedDate {
    @Id
    @GeneratedValue
    @Column(name = "user_quiz_solved_date_id")
    private Long id;

    private String solvedTime;

    @OneToOne(cascade = CascadeType.PERSIST)
    private Quiz quiz;

    @OneToOne(cascade = CascadeType.PERSIST)
    private User user;

    @Builder
    public UserQuizSolvedDate(Long id, String solvedTime, Quiz quiz, User user) {
        this.id = id;
        this.solvedTime = solvedTime;
        this.quiz = quiz;
        this.user = user;
    }
}
