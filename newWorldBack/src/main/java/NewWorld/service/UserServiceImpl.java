package NewWorld.service;

import NewWorld.domain.*;
import NewWorld.dto.ChangeInfoDto;
import NewWorld.dto.SolvedQuizDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;
import NewWorld.exception.ErrorCode;
import NewWorld.repository.UserQuizSolvedDateRepository;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * 로그인 처리
 */
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserQuizSolvedDateRepository userQuizSolvedDateRepository;
    /**
     * 회원가입 아이디 중복체크
     *
     * @param loginId
     * @return
     */
    public Boolean isLoginIdPresent(String loginId) throws CustomError {
        User idCheck = userRepository.findUserByUserId(loginId)
                .orElseThrow(() -> new CustomError(ErrorCode.USER_NOT_FOUND));
        ;
        return idCheck != null;
    }

    /**
     * 회원가입 중복체크
     *
     * @param phoneNumber
     * @param name
     * @return
     */
    public Boolean isUserPresent(String phoneNumber, String name) throws CustomError {
        User userCheck = userRepository.findUserByNameAndPhoneNumber(name, phoneNumber)
                .orElseThrow(() -> new CustomError(ErrorCode.USER_NOT_FOUND));
        return userCheck != null;
    }

    /**
     * 회원가입 중복체크
     *
     * @param nickname
     * @return
     */
    public Boolean isNicknamePresent(String nickname) throws CustomError {
        User userCheck = getUser(nickname);
        return userCheck != null;
    }

    /**
     * 회원가입
     *
     * @param joinInfo
     */
    @Override
    public ErrorCode join(UserDto joinInfo) throws CustomError {
        //유저 정보 중복체크
        ErrorCode result = validateJoinUser(joinInfo);

        if(result != ErrorCode.SUCCESS){
            return result;
        }
        User user = User.of(joinInfo);

        userRepository.save(user);
        return result;
    }


    /**
     * user기본정보 수정
     */
    @Override
    public UserDto updateUserInfo(ChangeInfoDto changeInfoDto) throws CustomError {

        User user = userRepository.findByNickname(changeInfoDto.getNickname())
                .orElseThrow(() -> new CustomError(ErrorCode.USER_NOT_FOUND));

        User changeNickname = user.changeNickname(changeInfoDto.getNewNickname());

        return UserDto.of(changeNickname).hideInfo();
    }

    /**
     * usespw 변경
     */
    @Override
    public UserDto updateUserPw(ChangeInfoDto changeInfoDto) throws CustomError {

        User user = userRepository.findUserByUserIdAndUserPassword(changeInfoDto.getUserId(), changeInfoDto.getOriginPassword())
                .orElse(null);
        if(user == null){
           return UserDto.builder().userId(changeInfoDto.getUserId()).build();
        }
        if(changeInfoDto.getNewPassword().equals(user.getUserPassword())){
            return UserDto.builder().userPassword(changeInfoDto.getOriginPassword()).build();
        }
        user.changePassword(changeInfoDto.getNewPassword());
        return UserDto.of(user);
    }

    /**
     * user기본정보 조회
     */
    @Override
    public UserDto getUserInfo(UserDto userDto) throws CustomError {
        User user = getUser(userDto.getNickname());
        if (user == null) {
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
        List<UserQuizSolvedDate> quizList = userQuizSolvedDateRepository.findAllByUser(user).orElse(null);
        if (quizList == null) {
            result.setPuzzleCount(0);
        } else {
            result.setPuzzleCount(quizList.size());
        }

        return result.hideInfo();
    }

    /**
     * 내가 푼 문제 불러오기
     *
     * @param userDto
     * @return
     */
    public List<SolvedQuizDto> getSolveQuizList(UserDto userDto) throws CustomError {
        List<SolvedQuizDto> result = null;
        User user = userRepository.findByNickname(userDto.getNickname())
                .orElseThrow(() -> new CustomError(ErrorCode.USER_NOT_FOUND));
        List<UserQuizSolvedDate> quizSolvedDate = userQuizSolvedDateRepository.findAllByUser(user)
                .orElse(null);

        quizSolvedDate.stream().forEach(s->result.add(SolvedQuizDto.of(s)));

        return result;
    }

    /**
     * 회원탈퇴
     *
     * @param userDto
     */
    public void withdraw(UserDto userDto) throws CustomError {
        User user = userRepository.findByNickname(userDto.getNickname())
                .orElseThrow(()->new CustomError(ErrorCode.NOT_FOUND));

        userQuizSolvedDateRepository.deleteAllByUser(user);
        userRepository.deleteByNickname(userDto.getNickname());
        // 플레이기록 , 게시물 제거
    }

    /**
     * user기본정보 조회
     *
     * @param userNickname
     */
    private User getUser(String userNickname) throws CustomError {
        User user = userRepository.findByNickname(userNickname)
                .orElseThrow(() -> new CustomError(ErrorCode.USER_NOT_FOUND));
        return user;
    }

    private ErrorCode validateJoinUser(UserDto joinInfo) throws CustomError {
        boolean idCheck = userRepository.findUserByUserId(joinInfo.getUserId())
                .isPresent();
        boolean userCheck = userRepository.findUserByNameAndPhoneNumber(joinInfo.getName(), joinInfo.getPhoneNumber())
                .isPresent();
        boolean nameCheck = userRepository.findByNickname(joinInfo.getNickname())
                .isPresent();
        if (idCheck) {
            return ErrorCode.USER_ID_DUPLICATION;
        }

        if (userCheck) {
            return ErrorCode.USER_DUPLICATION;
        }

        if (nameCheck) {
            return ErrorCode.USER_NICKNAME_DUPLICATION;
        }

        return ErrorCode.SUCCESS;
    }
}
