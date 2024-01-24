package NewWorld.service;

import NewWorld.domain.User;
import NewWorld.exception.LoginException;
import NewWorld.exception.NotfindUserException;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 2024.01.14 jeonill
 * 로그인 처리
 */
@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final UserRepository userRepository;
    private final UserService userService;

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
     * 회원아이디 찾기
     * @param userName
     * @param phoneNumber
     * @return
     * @throws LoginException
     */
    @Override
    public String findUserId(String userName, String phoneNumber) throws LoginException, NotfindUserException {
        User user = findUserforChageInfo(null, userName, phoneNumber);
        String userId = user.getUserId();

        return userId;
    }

    /**
     * 회원비밀번호 확인
     * @param loginId
     * @param userName
     * @param phoneNumber
     * @return
     * @throws LoginException
     */
    @Override
    public Boolean findUserPw(String loginId, String userName, String phoneNumber) throws  NotfindUserException {
        Boolean check = false;
        User user = findUserforChageInfo(loginId, userName, phoneNumber);
       if(user != null){
           check = true;
       }
        return check;
    }

    /**
     * 회원비밀번호 변경
     * @param loginId
     * @param userName
     * @param newPassword
     * @return
     * @throws LoginException
     */
    @Override
    public void ChangeUserPw(String loginId, String userName, String phoneNumber, String newPassword) throws NotfindUserException {
        User user = findUserforChageInfo(loginId, userName, phoneNumber);
        user.changePassword(newPassword);

        userRepository.save(user);
    }

    /**
     * 회원체크
     * @param loginId
     * @param loginPw
     * @return
     * @throws LoginException
     */
    private String userCheck(String loginId, String loginPw) throws LoginException {
        User loginUser = userRepository.findUserByUserIdAndUserPassword(loginId, loginPw);

        try {
            String userName = loginUser.getName();
            return userName;
        } catch (Exception e) {
            throw new LoginException("로그인 정보를 찾을 수 없습니다.");
        }
    }

    /**
     * 아이디,비번변경을 위한 유저확인
     * @param loginId
     * @param userName
     * @param phoneNumber
     * @return
     */
    private User findUserforChageInfo(String loginId, String userName, String phoneNumber) throws NotfindUserException {
        User user = null;
        if(loginId == null){
            user = userRepository.findByNameAndAndPhoneNumber(userName, phoneNumber);
        }else{
            user = userRepository.findByNameAndAndPhoneNumber(userName, phoneNumber);
        }

        if(user == null){
            throw new NotfindUserException("찾을수 없는 회원입니다");
        }
        return user;
    }
}
