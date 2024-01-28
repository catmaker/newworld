package NewWorld.service;

import NewWorld.domain.Post;
import NewWorld.dto.PostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 2024.0128 jeonil
 * 게시판 관련
 */
public interface PostService {
    /**
     * 게사판 불러오기
     * @param pageable
     * @return
     */
    Page<Post> allPost(Pageable pageable);

    /**
     * 특정 회원 게시판 불러오기
     * @param pageable
     * @param userName
     * @param userNickname
     * @return
     */
    public Page<Post> myPost(Pageable pageable, String userName, String userNickname);
    public PostDto getPost(PostDto postDto);
    public void makePost(PostDto postDto, String userName);
    public void changePost(PostDto postDto,  String userNickname);
    public void deletePost(PostDto postDto);
}
