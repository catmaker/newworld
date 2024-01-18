package NewWorld.service;

import NewWorld.exception.JoinException;
import NewWorld.exception.LoginException;
import NewWorld.vo.UserVo;

/**
 * 2024.01.17 jeonil
 * 로그인 처리
 */
public interface JoinService {

    /**
     * 로그인 처리
     * @param loginId
     * @param loginPw
     * @return
     */
    public void join(UserVo userVo) throws LoginException, JoinException;

}
