package NewWorld.domain;

import NewWorld.dto.ImageFileDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

/**
 * 2024.01.12 jeonil
 * 이미지 파일 경로
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ImageFile {

    @Id @GeneratedValue
    @Column(name = "imagefile_id")
    private Long id;

    private String path;

    private String originalPath;

    private String fileName;

    @Builder
    public ImageFile(Long id, String path, String originalPath, String fileName) {
        this.id = id;
        this.path = path;
        this.originalPath = originalPath;
        this.fileName = fileName;
    }

    public static ImageFile of(ImageFileDto imageFileDto){
        ImageFile newImageFile = ImageFile.builder()
                .fileName(imageFileDto.getFileName())
                .originalPath(imageFileDto.getOriginalPath())
                .path(imageFileDto.getPath())
                .build();
        return newImageFile;
    }
}
