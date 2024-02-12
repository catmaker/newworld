package NewWorld.service;

import NewWorld.domain.User;
import NewWorld.exception.LoginException;
import NewWorld.exception.NotfindUserException;

/**
 * 2024.01.14 jeonil
 * 로그인 처리
 */
public interface LoginService {


    /**
     * 로그인 처리
     * @param loginId
     * @param loginPw
     * @return
     */
    public User login(String loginId, String loginPw) throws LoginException;

    /**
     * 로그아웃 처리
     * @param loginId
     * @param loginPw
     * @return
     */
    public String logout(String loginId, String loginPw) throws LoginException;

    /**
     * 아이디 찾기
     * @param userName
     * @param phoneNumber
     * @return
     */
    public String findUserId(String userName, String phoneNumber) throws LoginException, NotfindUserException;

    /**
     * 비밀번호 찾기
     * @param loginId
     * @param userName
     * @param phoneNumber
     * @return
     */
    public Boolean findUserPw(String loginId, String userName, String phoneNumber) throws LoginException, NotfindUserException;

    /**
     * 비밀번호 변경
     * @param loginId
     * @param userName
     * @param newPassword
     * @return
     */
    public void ChangeUserPw(String loginId, String userName, String phoneNumber, String newPassword) throws LoginException, NotfindUserException;
}
