package NewWorld.service;

import NewWorld.exception.CustomError;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface ImageFileService {
    File saveImageFile(MultipartFile multipartFile, String userName, String userNickname) throws CustomError, IOException;
}
