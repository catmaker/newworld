package NewWorld.dto;

import NewWorld.domain.Post;
import NewWorld.domain.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 2024.01.28 jeonil
 * 게시판 서비스
 */
@Getter
@Setter
public class PostDto {

    @NotBlank
    @NotEmpty
    @NotNull
    private String title;

    @NotBlank
    @NotEmpty
    @NotNull
    private String detail;

    @NotBlank
    @NotEmpty
    @NotNull
    private Date makedDate;

    @NotBlank
    @NotEmpty
    @NotNull
    private String userNickName;

    /**
     * 게사판정보 ->dto
     * @param post
     */
    public PostDto toDto(Post post){

        this.title = post.getTitle();
        this.detail = post.getDetail();
        this.makedDate = post.getMakedDate();
        this.userNickName = post.getUserNickName();

        return this;
    }

}
