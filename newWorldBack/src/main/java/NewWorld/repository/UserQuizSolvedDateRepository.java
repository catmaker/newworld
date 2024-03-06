package NewWorld.repository;

import NewWorld.domain.Quiz;
import NewWorld.domain.User;
import NewWorld.domain.UserQuizSolvedDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface UserQuizSolvedDateRepository extends JpaRepository<UserQuizSolvedDate, Long> {
    Optional<List<UserQuizSolvedDate>>  findAllByQuiz(Quiz quiz);
    Optional<List<UserQuizSolvedDate>> findAllByUser(User user);

    void deleteAllByUser(User user);
    void deleteAllByQuiz(Quiz quiz);
}
