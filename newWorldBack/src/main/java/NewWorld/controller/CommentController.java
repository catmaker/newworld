package NewWorld.controller;

import NewWorld.domain.Comment;
import NewWorld.dto.CommentDto;
import NewWorld.exception.CustomError;
import NewWorld.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static NewWorld.common.ResponseEntityConstants.RESPONSE_ENTITY_NO_CONTENT;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/postsCommunityComments")
    public ResponseEntity<String> setComment(@RequestBody CommentDto commentDto) throws CustomError {
        commentService.setComment(commentDto);
        return ResponseEntity.ok().body("ok");
    }

    @PostMapping("/updateCommunityComments")
    public ResponseEntity<Comment> updateComment(@RequestBody CommentDto commentDto) throws CustomError {

        Comment result = commentService.modifyComment(commentDto);

        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/deleteCommunityComments")
    public ResponseEntity<HttpStatus> deleteComment(@RequestBody CommentDto commentDto) throws CustomError {
        commentService.deleteComment(commentDto);
        return RESPONSE_ENTITY_NO_CONTENT;
    }
}
