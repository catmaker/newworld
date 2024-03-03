package NewWorld.service;

import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;

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
     * @param userName
     * @param phoneNumber
     * @return
     */
    public String findUserId(String userName, String phoneNumber) throws CustomError;

    /**
     * 비밀번호 찾기
     * @param loginId
     * @param userName
     * @param phoneNumber
     * @return
     */
    public Boolean findUserPw(String loginId, String userName, String phoneNumber) throws CustomError;

    /**
     * 비밀번호 변경
     * @param loginId
     * @param userName
     * @param newPassword
     * @return
     */
    public void updateUserPw(String loginId, String userName, String phoneNumber, String newPassword) throws CustomError;
}
