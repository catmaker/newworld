package NewWorld.repository;

import NewWorld.domain.Post;
import NewWorld.domain.User;
import NewWorld.dto.PostDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.JoinException;
import NewWorld.exception.LoginException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
    User findUserByUserId(String userId);

    /**
     * user로그인
     * @param userId
     * @param userPw
     * @return
     */
    User findUserByUserIdAndUserPassword(String userId, String userPw);

    /**
     * user 기본정보조회
     * @param name
     * @param nickname
     * @return
     */
    User findUserByNameAndNickname(String name, String nickname);


    /**
     * 회원조회(비번찾기)
     * @param loginId
     * @param userName
     * @param phoneNumber
     * @return
     */
    User findByUserIdAndNameAndPhoneNumber(String loginId, String userName, String phoneNumber);


}
