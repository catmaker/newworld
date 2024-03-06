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
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Quiz quiz;

    @Builder
    public UserQuizSolvedDate(Long id, String solvedTime, User user, Quiz quiz) {
        this.id = id;
        this.solvedTime = solvedTime;
        this.user = user;
        this.quiz = quiz;
    }

    public static UserQuizSolvedDate of(Quiz quiz, User user){
        return UserQuizSolvedDate.builder()
                .quiz(quiz)
                .user(user)
                .solvedTime(LocalDateTime.now().toLocalDate().toString())
                .build();
    }
}
