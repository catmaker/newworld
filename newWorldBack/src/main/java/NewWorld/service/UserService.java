package NewWorld.service;

import NewWorld.dto.UserDto;
import NewWorld.exception.JoinException;
import NewWorld.exception.LoginException;
import NewWorld.exception.NotChangeException;
import NewWorld.exception.NotfindUserException;

/**
 * 2024.01.17 jeonil
 * 로그인 처리
 */
public interface UserService {

    /**
     * 로그인 처리
     * @param joinInfo
     * @return
     */
    public String join(UserDto joinInfo) throws LoginException, JoinException;

    /**
     * 회원정보 수정
     * @param joinInfo
     * @return
     */
    public void updateUserInfo(UserDto joinInfo) throws LoginException, JoinException, NotfindUserException, NotChangeException, Exception;

    /**
     * user기본정보 조회
     * @param userName
     * @param userNickname
     * @return
     */
    UserDto getUserInfo(String userName, String userNickname) throws IllegalAccessException, NotfindUserException;

}
