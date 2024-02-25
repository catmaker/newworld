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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional
public class PostServiceimpl implements PostService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Override
    public Page<Post> getAllPost(Pageable pageable) {

        return postRepository.findAll(pageable);
    }

    @Override
    public PostDto getPost(PostDto info) {
        Optional<Post> byId = postRepository.findById(info.getPostId());

        if(byId.isPresent()){
            Post post = byId.get();
            post.addview();

            PostDto postDto = new PostDto().toDto(post);

            return postDto;
        }
        return null;
    }

    @Override
    public String makePost(PostDto postDto) {
        String userNickName = postDto.getNickname();
        User user = userRepository.findByNickname(userNickName);

        Post firstPost = Post.builder().
                title(postDto.getTitle()).
                detail(postDto.getDetail()).
                makedDate(LocalDateTime.now()).
                postType(postDto.getPostType()).
                likes(0).
                views(0).
                userNickName(postDto.getNickname()).build();

        Post savedPost = postRepository.save(firstPost);

        user.getPostList().add(savedPost);

        return "s";
    }

    @Override
    public String changePost(PostDto postDto) {

        Post post = getPost(postDto.getPostId());
        if(post == null){return "f";}
        post.chagePost(postDto);
        return "s";
    }

    @Override
    public String deletePost(PostDto postDto) {
        Post post = getPost(postDto.getPostId());
        if(post == null){return "f";}
        postRepository.delete(post);
        return "s";
    }

    @Override
    public String addLike(PostDto postDto) {
        Post post = getPost(postDto.getPostId());

        if (post == null){return "f";}

        post.addLike();
        return "s";
    }


    public Post getPost(Long postId) {
        Optional<Post> byId = postRepository.findById(postId);

        if (byId.isPresent()){
            return byId.get();
        }
       return null;
    }
}
