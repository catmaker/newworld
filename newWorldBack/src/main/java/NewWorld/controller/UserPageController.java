package NewWorld.controller;

import NewWorld.domain.Quiz;
import NewWorld.dto.ChangeInfoDto;
import NewWorld.dto.SolvedQuizDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.NotfindUserException;
import NewWorld.service.ImageFileService;
import NewWorld.service.QuizService;
import NewWorld.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
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
import java.nio.file.Files;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserPageController {

    private final UserService userService;
    private  final QuizService quizService;
    private final ImageFileService imageFileService;

    @GetMapping("/getUserProfile")
    public UserDto findUserProfile(@RequestBody UserDto userDto) throws NotfindUserException, IllegalAccessException {
        try {
            UserDto userInfo = userService.getUserInfo(userDto);

            return userInfo;
        }catch (Exception e){

            return null;
        }
    }

    @PostMapping("/postUserProfile")
    public String updateUserProfile(@RequestBody ChangeInfoDto changeInfoDto) throws Exception {
        String result = userService.updateUserInfo(changeInfoDto);

        return result;
    }

    @PostMapping("/getUserProfileImage")
    public ResponseEntity<byte[]> updateUserProfileImage(@RequestBody UserDto userDto) throws NotfindUserException, IllegalAccessException {

        ResponseEntity<byte[]> result;
        UserDto userInfo = userService.getUserInfo(userDto);
        File imageFile = userInfo.getImageFile();
        String path = imageFile.getPath();

        try{
            HttpHeaders header = new HttpHeaders();

            header.add("Content-Type", Files.probeContentType(imageFile.toPath()));

            result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(imageFile), header, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }

    @PostMapping("/postUserProfileImage")
    public String updateUserProfileImage(MultipartFile uploadFile, HttpServletRequest request,@RequestBody UserDto userDto){

        String realPath = request.getServletContext().getRealPath("/upload");
        String result = imageFileService.saveImageFile(uploadFile, realPath, userDto.getName(), userDto.getNickname());

        return result;
    }

    @GetMapping("/getUserClearQuizzes")
    public List<SolvedQuizDto> findUserClearQuizzes(@RequestBody UserDto userDto){
        try{
            List<SolvedQuizDto> solveQuizList = userService.getSolveQuizList(userDto);

            return solveQuizList;
        }catch (Exception e){
            return null;
        }
    }

    @GetMapping("/getQuizzes")
    public Page<Quiz> findQuizzes(@RequestParam(required = false, defaultValue = "0", value = "page") int pageNo){
        Pageable pageable = PageRequest.of(pageNo, 5);
        Page<Quiz> quizzes = quizService.getQuizzes(pageable);
        return quizzes;
    }

}
