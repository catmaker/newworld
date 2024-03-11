package NewWorld.service;

import NewWorld.dto.UserDto;
import NewWorld.exception.CustomError;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface ImageFileService {
    String saveImageFile(UserDto userDto) throws CustomError, IOException;
}
