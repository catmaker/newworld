package NewWorld.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageFileService {
    String saveImageFile(MultipartFile multipartFile, String realPath, String userName, String userNickname);
}
