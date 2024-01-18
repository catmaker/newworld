package NewWorld.repository;

import NewWorld.vo.UserVo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 2024.01.14 jeonil
 * 로그인 처리
 */
public interface UserRepository extends JpaRepository<UserVo, Long> {

    UserVo findUserVoByUserIdAndUserPassword(String userId, String userPw);

}
