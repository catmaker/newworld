package NewWorld.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageFileDto {

    private String path;

    private String originalPath;

    private String fileName;

    @Builder
    public ImageFileDto(String path, String originalPath, String fileName) {
        this.path = path;
        this.originalPath = originalPath;
        this.fileName = fileName;
    }

    public static ImageFileDto of(String path) {
        return ImageFileDto.builder()
                .path(path)
                .originalPath(path)
                .fileName(path)
                .build();
    }
}
