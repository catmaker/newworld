package NewWorld.service;

import NewWorld.domain.Post;
import NewWorld.dto.PostDto;
import NewWorld.exception.CustomError;
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
    List<PostDto> getAllPost(Pageable pageable);
    public PostDto getPost(PostDto postDto) throws CustomError;
    public PostDto makePost(PostDto postDto) throws CustomError;
    public PostDto changePost(PostDto postDto);
    public void deletePost(PostDto postDto) throws CustomError;
    public int updateLike(PostDto postDto) throws CustomError;
}
