package NewWorld.service;

import NewWorld.exception.LoginException;
import NewWorld.repository.UserRepository;
import NewWorld.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 2024.01.14 jeonill
 * 로그인 처리
 */
@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final UserRepository loginRepository;

    /**
     * 로그인
     *
     * @param loginId
     * @param loginPw
     * @return
     */
    @Override
    public String login(String loginId, String loginPw) throws LoginException {
        return userCheck(loginId, loginPw);
    }

    /**
     * 로그아웃
     * @param loginId
     * @param loginPw
     * @return
     */
    @Override
    public String logout(String loginId, String loginPw) throws LoginException {
        return userCheck(loginId, loginPw);
    }

    /**
     * 회원체크
     * @param loginId
     * @param loginPw
     * @return
     * @throws LoginException
     */
    private String userCheck(String loginId, String loginPw) throws LoginException {
        UserVo loginUser = loginRepository.findUserVoByUserIdAndUserPassword(loginId, loginPw);

        try {
            String userName = loginUser.getName();
            return userName;
        } catch (Exception e) {
            throw new LoginException("로그인 정보를 찾을 수 없습니다.");
        }
    }
}
