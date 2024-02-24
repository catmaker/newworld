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
    Page<Post> getAllPost(Pageable pageable);
    public PostDto getPost(PostDto postDto);
    public String makePost(PostDto postDto);
    public String changePost(PostDto postDto);
    public String deletePost(PostDto postDto);
    public String addLike(PostDto postDto);
}
