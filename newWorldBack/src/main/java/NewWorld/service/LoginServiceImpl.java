package NewWorld.service;

import NewWorld.config.EncoderConfig;
import NewWorld.domain.User;
import NewWorld.dto.UserDto;
import NewWorld.exception.LoginException;
import NewWorld.exception.NotfindUserException;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * 2024.01.14 jeonill
 * 로그인 처리
 */
@Service
@Transactional
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final UserRepository userRepository;

    /**
     * 로그인
     *
     * @param loginId
     * @param loginPw
     * @return
     */
    @Override
    public UserDto login(String loginId, String loginPw) throws LoginException {
        User user = userCheck(loginId, loginPw);
        LocalDateTime loginDate = user.getLoginDate();
        int now = Integer.parseInt(LocalDateTime.now().toLocalDate().toString().replaceAll("-",""));
        int loginDay ;
        //출석체크를 위한 날짜 체크
        if(loginDate == null){
            loginDay = now;
        }else{
            loginDay = Integer.parseInt(loginDate.toLocalDate().toString().replaceAll("-",""));
        }

        if (now>loginDay || user.getAttendance() == 0){
            user.checkAttendance();
        }

        UserDto userDto = UserDto.of(user);
        UserDto sessionInfo = userDto.getSessionInfo();

        return sessionInfo;
    }

    /**
     * 로그아웃
     * @param loginId
     * @param loginPw
     * @return
     */
    @Override
    public String logout(String loginId, String loginPw) throws LoginException {
        return userCheck(loginId, loginPw).getName();
    }

    /**
     * 회원아이디 찾기
     * @param userName
     * @param phoneNumber
     * @return
     * @throws LoginException
     */
    @Override
    public String findUserId(String userName, String phoneNumber) throws NotfindUserException {
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
        User user = findUserforChageInfo(loginId, userName, phoneNumber);
        return user != null;
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
    public void updateUserPw(String loginId, String userName, String phoneNumber, String newPassword) throws NotfindUserException {
        User user = findUserforChageInfo(loginId, userName, phoneNumber);
        user.changePassword(newPassword);
    }

    /**
     * 회원체크
     * @param loginId
     * @param loginPw
     * @return
     * @throws LoginException
     */
    private User userCheck(String loginId, String loginPw) throws LoginException {
        try {
            User loginUser = userRepository.findUserByUserIdAndUserPassword(loginId, loginPw);
            return loginUser;
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
            user = userRepository.findByUserIdAndNameAndPhoneNumber(loginId, userName, phoneNumber);
        }else{
            user = userRepository.findByUserIdAndNameAndPhoneNumber(loginId, userName, phoneNumber);
        }

        if(user == null){
            return null;
        }
        return user;
    }
}
