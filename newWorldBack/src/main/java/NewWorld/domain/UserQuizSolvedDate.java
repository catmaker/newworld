package NewWorld.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserQuizSolvedDate {
    @Id
    @GeneratedValue
    @Column(name = "user_quiz_solved_date_id")
    private Long id;

    private String solvedTime;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Quiz quiz;

    @Builder
    public UserQuizSolvedDate(Long id, String solvedTime, Quiz quiz) {
        this.id = id;
        this.solvedTime = solvedTime;
        this.quiz = quiz;
    }

    public static UserQuizSolvedDate of(Quiz quiz){
        return UserQuizSolvedDate.builder()
                .quiz(quiz)
                .solvedTime(LocalDateTime.now().toLocalDate().toString())
                .build();
    }
}
