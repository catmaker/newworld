package NewWorld.repository;

import NewWorld.domain.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<PostLike,Long> {
}
