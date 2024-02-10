package NewWorld.service;

import NewWorld.domain.Post;
import NewWorld.domain.User;
import NewWorld.dto.PostDto;
import NewWorld.repository.PostRepository;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class PostServiceimpl implements PostService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Override
    public Page<Post> getAllPost(Pageable pageable) {
        PageRequest pageRequest = getPageRequest(pageable);

        return postRepository.findAll(pageRequest);
    }

    @Override
    public PostDto getPost(PostDto info) {
        Post post = postRepository.findBypost(info);
        PostDto postDto = new PostDto().toDto(post);
        return postDto;
    }

    @Override// pagable 없이 LIst,  만나서
    public Page<Post> getMyPost(Pageable pageable, String userName, String userNickname) {
        PageRequest pageRequest = getPageRequest(pageable);
        Page<Post> myPosts = postRepository.findPostsByUserNickName(pageRequest, userNickname);

        return myPosts;
    }

    @Override
    public void makePost(PostDto postDto, String username) {
        String userNickName = postDto.getUserNickName();
        User user = userRepository.findUserByNameAndNickname(username, userNickName);

        Post firstPost = Post.builder().
                title(postDto.getTitle()).
                detail(postDto.getDetail()).
                makedDate(postDto.getMakedDate()).
                userNickName(postDto.getUserNickName()).build();

        Post savedPost = postRepository.save(firstPost);

        user.getPostList().add(savedPost);
    }

    @Override
    public void changePost(PostDto postDto,String userName) {

        Post post= postRepository.findBypost(postDto);

        post.chagePost(postDto);
    }

    @Override
    public void deletePost(PostDto postDto) {
        Post post = postRepository.findBypost(postDto);
        postRepository.delete(post);
    }

    /**
     * 게사판 pageable
     * @param pageable
     * @return
     */
    private static PageRequest getPageRequest(Pageable pageable) {
        int page = pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() - 1;
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("makeDate").descending());
        return pageRequest;
    }
}
