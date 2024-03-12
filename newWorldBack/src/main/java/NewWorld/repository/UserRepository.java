package NewWorld.repository;

import NewWorld.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * 2024.01.14 jeonil
 * 로그인 처리
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 회원가입 아이디 중복체크
     * @param userId
     * @return
     */
    Optional<User> findUserByUserId(String userId);

    /**
     * 회원가입 중복체크
     * @param name
     * @param phoneNumber
     * @return
     */
    Optional<User> findUserByNameAndPhoneNumber(String name, String phoneNumber);

    /**
     * user로그인
     * @param userId
     * @param userPw
     * @return
     */
    Optional<User> findUserByUserIdAndUserPassword(String userId, String userPw);

    /**
     * 회원조회(비번찾기)
     * @param loginId
     * @param phoneNumber
     * @return
     */
    Optional<User> findByUserIdAndPhoneNumber(String loginId, String phoneNumber);

    /**
     * 닉네임조회
     * @param nickname
     * @return
     */
    Optional<User> findByNickname(String nickname);


    Optional<User> findByNameAndPhoneNumber(String userName, String phoneNumber);
    Optional<List<User>> findTop100ByOrderByAttendanceDesc();
    Optional<List<User>> findTop100ByOrderByPointDesc();
    Optional<List<User>> findTop100ByOrderByAttendanceDescPointDesc();

    void deleteByNickname(String userNickname);
}
