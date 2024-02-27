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
 * 로그인 처리
 */
public interface UserService {

    /**
     * 로그인 처리
     * @param joinInfo
     * @return
     */
    public String join(UserDto joinInfo);

    /**
     * 회원정보 수정
     * @param changeInfoDto
     * @return
     */
    public String updateUserInfo(ChangeInfoDto changeInfoDto);

    /**
     * user기본정보 조회
     * @param userDto
     * @return
     */
    UserDto getUserInfo(UserDto userDto) throws NotfindUserException;

    /**
     * user내가푼문제 조히
     * @param userDto
     * @return
     */
    List<SolvedQuizDto> getSolveQuizList(UserDto userDto);
}
