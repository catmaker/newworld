package NewWorld.service;

import NewWorld.dto.ChangeInfoDto;
import NewWorld.dto.SolvedQuizDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.JoinException;
import NewWorld.exception.LoginException;
import NewWorld.exception.NotChangeException;
import NewWorld.exception.NotfindUserException;

import java.util.List;

/**
 * 2024.01.17 jeonil
 * 로그인 처리
 */
public interface UserService {
    /**
     * 회원가입 아이디 중복 체크
     * @param loginId
     * @return
     */
    public Boolean checkIdValidation(String loginId);

    /**
     * 회원가입 중복체크
     *
     * @param phoneNumber
     * @param name
     * @return
     */
    public Boolean checkUserValidation(String phoneNumber, String name);
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
    public String updateUserInfo(ChangeInfoDto changeInfoDto) throws LoginException, JoinException, NotfindUserException, NotChangeException, Exception;

    /**
     * user기본정보 조회
     * @param userName
     * @param userNickname
     * @return
     */
    UserDto getUserInfo(String userName, String userNickname) throws IllegalAccessException, NotfindUserException;

    List<SolvedQuizDto> getSolveQuizList(UserDto userDto);
}
