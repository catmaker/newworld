package NewWorld.controller;

import NewWorld.domain.Quiz;
import NewWorld.dto.ChangeInfoDto;
import NewWorld.dto.SolvedQuizDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;
import NewWorld.exception.ErrorCode;
import NewWorld.service.ImageFileService;
import NewWorld.service.QuizService;
import NewWorld.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import static NewWorld.common.ResponseEntityConstants.RESPONSE_ENTITY_NO_CONTENT;

@RestController
@RequiredArgsConstructor
public class UserPageController {

    private final UserService userService;
    private final QuizService quizService;
    private final ImageFileService imageFileService;

    @PostMapping("/withdrawal")
    public ResponseEntity<HttpStatus> userWithdrawal(@RequestBody UserDto userDto) throws CustomError {
        userService.withdraw(userDto);
        return RESPONSE_ENTITY_NO_CONTENT;
    }
    @PostMapping("/getUserProfile")
    public ResponseEntity<UserDto> findUserProfile(@RequestBody UserDto userDto) throws CustomError {
            UserDto userInfo = userService.getUserInfo(userDto);
            return ResponseEntity.ok().body(userInfo);
    }

    @PostMapping("/postUserChangePw")
    public ResponseEntity<ErrorCode> updatePw(@RequestBody ChangeInfoDto changeInfoDto) throws Exception {
        ErrorCode result = userService.updateUserPw(changeInfoDto);

        return ResponseEntity.status(result.getStatus()).body(result);
    }



    @PostMapping("/postUserChangeInfo")
    public ResponseEntity<ErrorCode> updateInfo(@RequestBody ChangeInfoDto changeInfoDto) throws Exception {
        ErrorCode result = userService.updateUserInfo(changeInfoDto);

        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PostMapping("/getUserProfileImage")
    public ResponseEntity<String> getUserProfileImage(@RequestBody UserDto userDto) throws Exception {
        String result = userService.getUserImageFile(userDto);

        return ResponseEntity.ok().body(result);
    }


    @PostMapping("/postUserProfileImage")
    public ResponseEntity<String> updateUserProfileImage(@RequestBody UserDto userDto) throws CustomError, IOException {
        String imageFile = imageFileService.saveImageFile(userDto);
        return ResponseEntity.ok().body(imageFile);
    }

    @PostMapping("/getUserClearQuizzes")
    public ResponseEntity<List<SolvedQuizDto>> findUserClearQuizzes(@RequestBody UserDto userDto) throws CustomError {
            List<SolvedQuizDto> solveQuizList = userService.getSolveQuizList(userDto);
            return ResponseEntity.ok().body(solveQuizList);
    }

    @GetMapping("/getQuizzes")
    public ResponseEntity<Page<Quiz>> findQuizzes(@RequestParam(required = false, defaultValue = "0", value = "page") int pageNo){
        Pageable pageable = PageRequest.of(pageNo, 5);
        Page<Quiz> quizzes = quizService.getQuizzes(pageable);
        return ResponseEntity.ok().body(quizzes);
    }



}
