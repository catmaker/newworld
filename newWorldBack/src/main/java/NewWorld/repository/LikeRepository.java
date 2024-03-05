package NewWorld.repository;

import NewWorld.domain.Post;
import NewWorld.domain.PostLike;
import NewWorld.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<PostLike,Long> {

    PostLike findByPostAndUser(Post post, User user);

    int countAllByPost(Post post);

    void deleteByPostAndUser(Post post, User user);
    void deleteByPost(Post post);
}
