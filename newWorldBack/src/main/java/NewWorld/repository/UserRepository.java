package NewWorld.repository;

import NewWorld.domain.User;
import NewWorld.dto.UserDto;
import NewWorld.exception.JoinException;
import NewWorld.exception.LoginException;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 2024.01.14 jeonil
 * 로그인 처리
 */
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * user로그인
     * @param userId
     * @param userPw
     * @return
     */
    User findUserByUserIdAndUserPassword(String userId, String userPw);

    /**
     * user조회
     * @param name
     * @param naickname
     * @return
     */
    User findUserByNameAndNickname(String name, String naickname);

    /**
     * 가입시 중복검사
     * @param userId
     * @param userPw
     * @return
     */
    User findByNameAndAndPhoneNumber(String userId, String userPw);


}
