package NewWorld.controller;

import NewWorld.domain.Quiz;
import NewWorld.dto.ChangeInfoDto;
import NewWorld.dto.SolvedQuizDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;
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

@RestController
@RequiredArgsConstructor
public class UserPageController {

    private final UserService userService;
    private final QuizService quizService;
    private final ImageFileService imageFileService;

    @PostMapping("/getUserProfile")
    public ResponseEntity<UserDto> findUserProfile(@RequestBody UserDto userDto) throws CustomError {
            UserDto userInfo = userService.getUserInfo(userDto);
            return ResponseEntity.ok().body(userInfo);
    }

    @PostMapping("/postUserProfile")
    public ResponseEntity<UserDto> updateUserProfile(@RequestBody ChangeInfoDto changeInfoDto) throws Exception {
        UserDto result = userService.updateUserInfo(changeInfoDto);

        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/getUserProfileImage")
    public ResponseEntity<byte[]> getUserProfileImage(@RequestBody UserDto userDto) throws CustomError {

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
    public ResponseEntity<byte[]>  updateUserProfileImage(MultipartFile uploadFile, HttpServletRequest request,@RequestBody UserDto userDto) throws CustomError, IOException {
        ResponseEntity<byte[]> result;
        String realPath = request.getServletContext().getRealPath("/upload");
        File imageFile = imageFileService.saveImageFile(uploadFile, realPath, userDto.getName(), userDto.getNickname());

        try{
            HttpHeaders header = new HttpHeaders();

            header.add("Content-Type", Files.probeContentType(imageFile.toPath()));

            result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(imageFile), header, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
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
