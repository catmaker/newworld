package NewWorld.service;

import NewWorld.exception.LoginException;

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
    public String login(String loginId, String loginPw) throws LoginException;

    /**
     * 로그아웃 처리
     * @param loginId
     * @param loginPw
     * @return
     */
    public String logout(String loginId, String loginPw) throws LoginException;

}
