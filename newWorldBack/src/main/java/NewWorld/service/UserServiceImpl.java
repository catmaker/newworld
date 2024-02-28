package NewWorld.service;

import NewWorld.domain.*;
import NewWorld.dto.ChangeInfoDto;
import NewWorld.dto.SolvedQuizDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.JoinException;
import NewWorld.exception.NotfindUserException;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 로그인 처리
 */
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    /**
     * 회원가입 아이디 중복체크
     *
     * @param loginId
     * @return
     */
    public Boolean isLoginIdPresent(String loginId) {
        User idCheck = userRepository.findUserByUserId(loginId);
        return idCheck != null;
    }

    /**
     * 회원가입 중복체크
     *
     * @param phoneNumber
     * @param name
     * @return
     */
    public Boolean isUserPresent(String phoneNumber, String name) {
        User userCheck = userRepository.findUserByNameAndPhoneNumber(name, phoneNumber);
        return userCheck != null;
    }

    /**
     * 회원가입 중복체크
     *
     * @param nickname
     * @return
     */
    public Boolean isNicknamePresent(String nickname) {
        User userCheck = userRepository.findByNickname(nickname);
        return userCheck != null;
    }

    /**
     * 회원가입
     *
     * @param joinInfo
     * @throws JoinException
     */
    @Override
    public String join(UserDto joinInfo) {

        //유저 정보 중복체크
        String validationFailureCode = validateJoinUser(joinInfo);
        if (validationFailureCode != null) return validationFailureCode;;

        User user = User.of(joinInfo);

        userRepository.save(user);

        return "s";
    }


    /**
     * user기본정보 수정
     */
    @Override
    public String updateUserInfo(ChangeInfoDto changeInfoDto){

        User user = userRepository.findByNickname(changeInfoDto.getNickname());
        if(user == null){
            return "f";
        }

        String currentPassword = user.getUserPassword();
        String newPassword = changeInfoDto.getNewPassword();

        if (changeInfoDto.getCurrentPassword() != currentPassword){
            return "different password";
        }
        if (newPassword == currentPassword){
            return "same password";
        }

        user.changePassword(changeInfoDto.getNewPassword());

        return "s";
    }

    /**
     * user기본정보 조회
     */
    @Override
    public UserDto getUserInfo(UserDto userDto) throws NotfindUserException {
        User user = getUser(userDto.getNickname());
        if(user == null){
            return null;
        }
        UserDto result = UserDto.of(user);

//        ImageFile imageFile = user.getImageFile();
//        String fileName = imageFile.getFileName();
//        //추후업로드경로필요
//        String path = imageFile.getPath();
//        File file = new File(path, fileName);
//
//        if(!file.isFile()) return null;
//        result.setImageFile(file);

        List<UserQuizSolvedDate> quizList = user.getQuizList();
        if(quizList == null){
            result.setPuzzleCount(0);
        }else{
            result.setPuzzleCount(quizList.size());
        }

        return result;
    }

    /**
     * 내가 푼 문제 불러오기
     * @param userDto
     * @return
     */
    public List<SolvedQuizDto> getSolveQuizList(UserDto userDto){
        List<SolvedQuizDto> result = new ArrayList<>();
        User user = userRepository.findByNickname(userDto.getNickname());

        List<UserQuizSolvedDate> solvedQuizList = user.getQuizList();

        for(UserQuizSolvedDate solvedQuiz : solvedQuizList){
            SolvedQuizDto solvedQuizDto = SolvedQuizDto.of(solvedQuiz);
            result.add(solvedQuizDto);
        }

        return result;
    }
    /**
     * 회원탈퇴
     * @param userInfo
     * @throws JoinException
     */
    public void withdraw(String userInfo) {
        // 플레이기록 , 게시물 제거
    }

    /**
     * user기본정보 조회
     *  @param userNickname
     *  @throws NotfindUserException
     */
    private User getUser(String userNickname) {
        User userInfo = userRepository.findByNickname(userNickname);
        return userInfo;
    }

    private String validateJoinUser(UserDto joinInfo) {
        if (isLoginIdPresent(joinInfo.getUserId())) {
            return "f1";
        }

        if(isUserPresent(joinInfo.getName(), joinInfo.getPhoneNumber())){
            return "f2";
        }

        if(isNicknamePresent(joinInfo.getNickname())){
            return "f3";
        }

        return null;
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
