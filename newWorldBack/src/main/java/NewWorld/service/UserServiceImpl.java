package NewWorld.service;

import NewWorld.config.EncoderConfig;
import NewWorld.domain.*;
import NewWorld.dto.SolvedQuizDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.JoinException;
import NewWorld.exception.NotChangeException;
import NewWorld.exception.NotfindUserException;
import NewWorld.repository.ImageFileRepository;
import NewWorld.repository.UserQuizSolvedDateRepository;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 2024.01.14 jeonil
 * 로그인 처리
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserQuizSolvedDateRepository userQuizSolvedDateRepository;
    private final ImageFileRepository imageFileRepository;
    /**
     * 회원가입 아이디 중복체크
     *
     * @param loginId
     * @return
     */
    @Override
    public Boolean checkIdValidation(String loginId) {
        boolean validationCheck = false;
        User idCheck = userRepository.findUserByUserId(loginId);

        if (idCheck != null) {
            validationCheck = true;
        }
        return validationCheck;
    }

    /**
     * 회원가입 중복체크
     *
     * @param phoneNumber
     * @param name
     * @return
     */
    @Override
    public Boolean checkUserValidation(String phoneNumber, String name) {
        Boolean validationCheck = false;
        User userCheck = userRepository.findUserByNameAndPhoneNumber(name, phoneNumber);

        if (userCheck != null) {
            validationCheck = true;
        }

        return validationCheck;
    }

    /**
     * 회원가입 중복체크
     *
     * @param phoneNumber
     * @param name
     * @return
     */
    public Boolean checkNicknameValidation(String nicknamee) {
        Boolean validationCheck = false;
        User userCheck = userRepository.findByNickname(nicknamee);

        if (userCheck != null) {
            validationCheck = true;
        }

        return validationCheck;
    }

    /**
     * 회원가입
     *
     * @param joinInfo
     * @throws JoinException
     */
    @Transactional(readOnly = false)
    @Override
    public String join(UserDto joinInfo) throws JoinException {

        String checkJoinStatus = "s";

        String phoneNumber = joinInfo.getPhoneNumber();
        String name = joinInfo.getName();
        Boolean checkId = checkIdValidation(joinInfo.getUserId());
        Boolean checkUser = checkUserValidation(joinInfo.getName(), joinInfo.getPhoneNumber());
        Boolean checkNickname = checkNicknameValidation(joinInfo.getNickname());
        //회원 아이디 중복검사
        if (checkId) {
            return "f1";
        }
        //중복회원 검사
        if(checkUser){
            return "f2";
        }
        if(checkNickname){
            return "f3";
        }

        LocalDateTime now = LocalDateTime.now();
        String string = now.toLocalDate().toString();
        User newUser = User.builder().
                userId(joinInfo.getUserId()).
                userPassword(joinInfo.getUserPassword()).
                name(name).
                nickname(joinInfo.getNickname()).
                phoneNumber(phoneNumber).
                point(0).
                attendance(0).
                birthday(joinInfo.getBirthday()).
                joinDate(string).
                build();

        User savedUser = userRepository.save(newUser);

        if(savedUser == null){
            return "f";
        }

        return checkJoinStatus;
    }


    /**
     * user기본정보 수정
     */
    @Override
    @Transactional(readOnly = false)
    public String updateUserInfo(UserDto changeInfo) throws Exception {
        String phoneNumber = changeInfo.getPhoneNumber();
        String name = changeInfo.getName();
        String newNn = changeInfo.getNickname();
        String newPn = changeInfo.getPhoneNumber();
        String newBd = changeInfo.getBirthday();

        User user = getUser(name, newNn);

        if(user == null){
            return null;
        }

        Boolean checkChangeInfo = checkChangeInfo(changeInfo, user);

        //변경된 정보가 있는지 체크
        if (checkChangeInfo) {
            if (changeInfo.getNickname().isEmpty()) newNn = user.getNickname();
            if (changeInfo.getPhoneNumber().isEmpty()) newPn = user.getNickname();
            if (changeInfo.getBirthday() == null) newBd = user.getBirthday();

            user.basicInfoUpdate(newNn, newPn, newBd);
        } else {
            return null;
        }
        userRepository.save(user);

        return "s";
    }

    /**
     * user기본정보 조회
     */
    @Override
    public UserDto getUserInfo(String userName, String userNickname) throws NotfindUserException {
        User user = getUser(userName, userNickname);
        if(user == null){
            return null;
        }
        UserDto result = UserDto.of(user);

        ImageFile imageFile = user.getImageFile();
        String fileName = imageFile.getFileName();
        //추후업로드경로필요
        String path = imageFile.getPath();
        File file = new File(path, fileName);

        if(!file.isFile()) return null;
        result.setImageFile(file);

        List<Quiz> quizList = user.getQuizList();
        if(quizList == null){
            result.setPuzzleCount(0);
        }

        return result;
    }

    public List<SolvedQuizDto> getSolveQuizList(UserDto userDto){
        List<SolvedQuizDto> result = new ArrayList<>();
        String nickname = userDto.getNickname();
        User user = userRepository.findByNickname(nickname);

        List<UserQuizSolvedDate> byUser = userQuizSolvedDateRepository.findByUser(user);

        for(UserQuizSolvedDate userQuizSolvedDate : byUser){
            SolvedQuizDto solvedQuizDto = SolvedQuizDto.of(userQuizSolvedDate, userQuizSolvedDate.getQuiz());
            result.add(solvedQuizDto);
        }

        return result;
    }
    /**
     * 회원탈퇴
     *
     * @param userInfo
     * @throws JoinException
     */
    public void withdraw(String userInfo) {
        // 플레이기록 , 게시물 제거
    }

    /**
     * 2024-01-23 jeonill
     * user기본정보 조회
     */
    private User getUser(String userName, String userNickname) throws NotfindUserException {
        User userInfo = userRepository.findUserByNameAndNickname(userName, userNickname);
        return userInfo;
    }

    /**
     * 변경된 정보 확인
     *
     * @param changeInfo
     * @param userInfo
     * @return
     */
    private Boolean checkChangeInfo(UserDto changeInfo, User userInfo) {
        Boolean check = true;

        if (changeInfo.getBirthday() == userInfo.getBirthday()) {
            check = false;
        }
        if (changeInfo.getNickname() == userInfo.getNickname()) {
            check = false;
        }
        if (changeInfo.getBirthday() == userInfo.getBirthday()) {
            check = false;
        }
        if (changeInfo.getPhoneNumber() == userInfo.getPhoneNumber()) {
            check = false;
        }

        return check;
    }
}
