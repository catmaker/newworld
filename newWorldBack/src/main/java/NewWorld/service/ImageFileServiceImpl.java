package NewWorld.service;

import NewWorld.domain.ImageFile;
import NewWorld.domain.User;
import NewWorld.dto.ImageFileDto;
import NewWorld.exception.CustomError;
import NewWorld.exception.ErrorCode;
import NewWorld.repository.ImageFileRepository;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageFileServiceImpl implements ImageFileService {

    private final ImageFileRepository imageFileRepository;
    private final UserRepository userRepository;

    @Value("${url.downLoad.path}")
    private String dowmLoadPath;

    /**
     * Saves the uploaded image file.
     *
     * @param uploadFile The uploaded image file.
     * @return The status of the save operation. Possible values are "s" for success and "f" for failure.
     */
    @Override
    public File saveImageFile(MultipartFile uploadFile,  String userNickname) throws CustomError, IOException {
        User user = userRepository.findByNickname(userNickname)
                .orElseThrow(()->new CustomError(ErrorCode.USER_NOT_FOUND));

        // 이미지 파일만 업로드
        if (!Objects.requireNonNull(uploadFile.getContentType()).startsWith("image")) {
            log.warn("this file is not image type");
        }

        String originalFilename = uploadFile.getOriginalFilename();
        String path = dowmLoadPath + File.separator+ originalFilename;

        ImageFileDto imageFileDto = ImageFileDto.of(path, originalFilename);
        ImageFile imageFile = ImageFile.of(imageFileDto);

        if(user.getImageFile() != null){
            user.saveImage(imageFile);
        }else{
           imageFile = imageFileRepository.save(imageFile);
           user.saveImage(imageFile);
        }

        File file = new File(path);

        try {
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
            bos.write(uploadFile.getBytes());
            bos.close();

        } catch (Exception e) {
           throw e;
        }

        return file;
    }

}
