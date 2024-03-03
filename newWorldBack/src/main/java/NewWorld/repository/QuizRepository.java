package NewWorld.repository;

import NewWorld.domain.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Optional<Quiz> findByTitleAndAndMaker(String title, String maker);
}
