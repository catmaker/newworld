package NewWorld.service;

import NewWorld.dto.ChangeInfoDto;
import NewWorld.dto.SolvedQuizDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;

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
    public String join(UserDto joinInfo) throws CustomError;

    /**
     * 회원정보 수정
     * @param changeInfoDto
     * @return
     */
    public UserDto updateUserInfo(ChangeInfoDto changeInfoDto) throws CustomError;

    /**
     * user기본정보 조회
     * @param userDto
     * @return
     */
    UserDto getUserInfo(UserDto userDto) throws CustomError;

    /**
     * user내가푼문제 조히
     * @param userDto
     * @return
     */
    List<SolvedQuizDto> getSolveQuizList(UserDto userDto) throws CustomError;

    UserDto updateUserPw(ChangeInfoDto changeInfoDto) throws CustomError;
}
