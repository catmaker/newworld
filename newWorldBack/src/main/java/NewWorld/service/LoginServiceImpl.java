package NewWorld.service;

import NewWorld.domain.ImageFile;
import NewWorld.domain.User;
import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;
import NewWorld.exception.ErrorCode;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Optional;

/**
 * 2024.01.14 jeonill
 * 로그인 처리
 */
@Service
@Transactional
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final UserRepository userRepository;

    @Value("${url.downLoad.path}")
    private String downLoadPath;
    /**
     * 로그인
     *
     * @param loginId
     * @param loginPw
     * @return
     */
    @Override
    public UserDto login(String loginId, String loginPw) throws CustomError {
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
            user.addPoint();
        }

        UserDto userDto = UserDto.of(user);



        UserDto info = userDto.hideInfo();

        return info;
    }

    /**
     * 로그아웃
     * @param loginId
     * @param loginPw
     * @return
     */
    @Override
    public String logout(String loginId, String loginPw) throws CustomError {
        return userCheck(loginId, loginPw).getName();
    }

    /**
     * 회원아이디 찾기
     * @param userName
     * @param phoneNumber
     * @return
     */
    @Override
    public String findUserId(String userName, String phoneNumber) throws CustomError {
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
     */
    @Override
    public Boolean findUserPw(String loginId, String userName, String phoneNumber) throws CustomError {
        User user = findUserforChageInfo(loginId, userName, phoneNumber);
        return user != null;
    }

    /**
     * 회원비밀번호 변경
     * @param loginId
     * @param userName
     * @param newPassword
     * @return
     */
    @Override
    public void updateUserPw(String loginId, String userName, String phoneNumber, String newPassword) throws CustomError {
        User user = findUserforChageInfo(loginId, userName, phoneNumber);
        user.changePassword(newPassword);
    }

    /**
     * 회원체크
     * @param loginId
     * @param loginPw
     * @return
     */
    private User userCheck(String loginId, String loginPw) throws CustomError {
            User user = userRepository.findUserByUserIdAndUserPassword(loginId, loginPw)
                    .orElseThrow(() -> new CustomError(ErrorCode.USER_NOT_FOUND));
            return user;
    }

    /**
     * 아이디,비번변경을 위한 유저확인
     * @param loginId
     * @param userName
     * @param phoneNumber
     * @return
     */
    private User findUserforChageInfo(String loginId, String userName, String phoneNumber) throws CustomError {
        User user = null;
        if(loginId == null){
            user = userRepository.findByNameAndPhoneNumber( userName, phoneNumber)
                    .orElseThrow(()->new CustomError(ErrorCode.USER_NOT_FOUND));
        }else{
            user = userRepository.findByUserIdAndNameAndPhoneNumber(loginId, userName, phoneNumber)
                    .orElseThrow(()->new CustomError(ErrorCode.USER_NOT_FOUND));;
        }

        if(user == null){
            return null;
        }
        return user;
    }
}
