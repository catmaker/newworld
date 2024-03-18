package NewWorld.service;

import NewWorld.dto.CheckDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;
import NewWorld.exception.ErrorCode;

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
    public UserDto login(String loginId, String loginPw) throws CustomError;

    /**
     * 로그아웃 처리
     * @param loginId
     * @param loginPw
     * @return
     */
    public String logout(String loginId, String loginPw) throws CustomError;

    /**
     * 아이디 찾기
     * @param checkDto
     * @return
     */
    public String findUserId(CheckDto checkDto) throws CustomError;

    /**
     * 비밀번호 찾기
     * @param checkDto
     * @return
     */
    public ErrorCode checkUserPw(CheckDto checkDto) throws CustomError;

    /**
     * 비밀번호 변경
     * @param checkDto
     * @return
     */
    public ErrorCode chagePassword(CheckDto checkDto) throws CustomError;


}
