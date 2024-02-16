package NewWorld.repository;

import NewWorld.domain.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Quiz findByTitleAndAndMaker(String title, String maker);
}
