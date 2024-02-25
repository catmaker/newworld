package NewWorld.controller;

import NewWorld.domain.Post;
import NewWorld.dto.PostDto;
import NewWorld.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/getCommunity")
    public Page<Post> findPostList(@RequestParam(required = false, defaultValue = "0", value = "page") int pageNo){
        Pageable pageable = PageRequest.of(pageNo, 5, Sort.by("makedDate"));
        Page<Post> allPost = postService.getAllPost(pageable);

        return allPost;
    }

    @GetMapping("/getPost")
    public PostDto findPostList(@RequestBody PostDto postDto){

        PostDto post = postService.getPost(postDto);

        return post;
    }

    @PostMapping("/postsCreate")
    public String makePost(@RequestBody PostDto postDto){
        try {
            postService.makePost(postDto);
        }catch (Exception e){
            return "f";
        }
        return "s";
    }

    @PostMapping("/postsUpdate")
    public String updatePost(@RequestBody PostDto postDto){
        try {
            postService.changePost(postDto);
        }catch (Exception e){
            return "f";
        }
        return "s";
    }

    @PostMapping("/postsDelete")
    public String deletePost(@RequestBody PostDto postDto){
        try {
            postService.deletePost(postDto);
        }catch (Exception e){
            return "f";
        }
        return "s";
    }

    @PostMapping("/postsLike")
    public String addLike(@RequestBody PostDto postDto){
        try {
            postService.addLike(postDto);
        }catch (Exception e){
            return "f";
        }
        return "s";
    }
}
