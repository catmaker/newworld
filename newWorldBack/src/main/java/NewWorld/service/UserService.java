package NewWorld.service;

import NewWorld.dto.ChangeInfoDto;
import NewWorld.dto.SolvedQuizDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;
import NewWorld.exception.ErrorCode;
import org.springframework.http.HttpStatus;

import java.io.File;
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
    public ErrorCode join(UserDto joinInfo) throws CustomError;

    /**
     * 회원정보 수정
     * @param changeInfoDto
     * @return
     */
    public ErrorCode updateUserInfo(ChangeInfoDto changeInfoDto) throws CustomError;

    /**
     * user기본정보 조회
     * @param userDto
     * @return
     */
    UserDto getUserInfo(UserDto userDto) throws CustomError;

    /**
     *
     * @param userDto
     * @return
     * @throws CustomError
     */
    String getUserImageFile(UserDto userDto) throws CustomError;

    /**
     * user내가푼문제 조히
     * @param userDto
     * @return
     */
    List<SolvedQuizDto> getSolveQuizList(UserDto userDto) throws CustomError;

    ErrorCode updateUserPw(ChangeInfoDto changeInfoDto) throws CustomError;

    void withdraw(UserDto userDto) throws CustomError;
}
