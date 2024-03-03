package NewWorld.controller;

import NewWorld.domain.Post;
import NewWorld.dto.PostDto;
import NewWorld.exception.CustomError;
import NewWorld.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import static NewWorld.common.ResponseEntityConstants.RESPONSE_ENTITY_NO_CONTENT;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/getCommunity")
    public ResponseEntity<Page<Post>> findPostList(@RequestParam(required = false, defaultValue = "0", value = "page") int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5, Sort.by("makedDate"));
        Page<Post> allPost = postService.getAllPost(pageable);

        return ResponseEntity.ok().body(allPost);
    }

    @GetMapping("/getPost")
    public ResponseEntity<PostDto> findPostList(PostDto postDto) throws CustomError {

        PostDto result = postService.getPost(postDto);

        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/postsCreate")
    public ResponseEntity<PostDto> makePost(@RequestBody PostDto postDto) throws CustomError {

        PostDto result = postService.makePost(postDto);

        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/postsUpdate")
    public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto) {

        PostDto result = postService.changePost(postDto);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/postsDelete")
    public ResponseEntity<HttpStatus> deletePost(@RequestBody PostDto postDto) {
        postService.deletePost(postDto);
        return RESPONSE_ENTITY_NO_CONTENT;
    }

    @PostMapping("/postsLike")
    public int addLike(@RequestBody PostDto postDto) {
        int likes = postService.addLike(postDto);
        return likes;
    }
}
