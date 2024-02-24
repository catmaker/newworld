package NewWorld.controller;

import NewWorld.dto.ChangeInfoDto;
import NewWorld.dto.SolvedQuizDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.NotfindUserException;
import NewWorld.service.ImageFileService;
import NewWorld.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserPageController {

    private final UserService userService;
    private final ImageFileService imageFileService;

    @PostMapping("/getUserProfile")
    public UserDto findUserProfile(@RequestBody UserDto userDto) throws NotfindUserException, IllegalAccessException {
        UserDto userInfo = userService.getUserInfo(userDto.getName(), userDto.getNickname());

        return userInfo;
    }

    @PostMapping("/postUserProfile")
    public String updateUserProfile(@RequestBody ChangeInfoDto changeInfoDto) throws Exception {
        String result = userService.updateUserInfo(changeInfoDto);

        return result;
    }

    @PostMapping("/getUserProfileImage")
    public ResponseEntity<byte[]> updateUserProfileImage(@RequestBody UserDto userDto) throws NotfindUserException, IllegalAccessException {

        ResponseEntity<byte[]> result;
        UserDto userInfo = userService.getUserInfo(userDto.getNickname(), userDto.getName());
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

    @PostMapping("/getUserClearQuizzes")
    public List<SolvedQuizDto> findUserClearQuizzes(@RequestBody UserDto userDto){
        try{
            List<SolvedQuizDto> solveQuizList = userService.getSolveQuizList(userDto);

            return solveQuizList;
        }catch (Exception e){
            return null;
        }
    }


}
