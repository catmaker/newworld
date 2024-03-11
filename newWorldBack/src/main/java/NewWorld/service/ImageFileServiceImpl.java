package NewWorld.service;

import NewWorld.domain.ImageFile;
import NewWorld.domain.User;
import NewWorld.dto.ImageFileDto;
import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;
import NewWorld.exception.ErrorCode;
import NewWorld.repository.ImageFileRepository;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ImageFileServiceImpl implements ImageFileService {

    private final ImageFileRepository imageFileRepository;
    private final UserRepository userRepository;

    @Value("${url.downLoad.path}")
    private String downLoadPath;

    /**
     * Saves the uploaded image file.
     *
     * @param uploadFile The uploaded image file.
     * @return The status of the save operation. Possible values are "s" for success and "f" for failure.
     */
    @Override
    public String saveImageFile(UserDto userDto) throws CustomError, IOException {
        User user = userRepository.findByNickname(userDto.getNickname())
                .orElseThrow(()->new CustomError(ErrorCode.USER_NOT_FOUND));


        String path = userDto.getImageFilePath();

        ImageFileDto imageFileDto = ImageFileDto.of(path);
        ImageFile imageFile = ImageFile.of(imageFileDto);

        user.saveImage(imageFile);

        return path;
    }

}
