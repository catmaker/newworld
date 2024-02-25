package NewWorld.controller;

import NewWorld.dto.CommentDto;
import NewWorld.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/postsCommunityComments")
    public String setComment(@RequestBody CommentDto commentDto){
        try {
            String result = commentService.setComment(commentDto);
            return result;
        }catch (Exception e){
            return "f";
        }
    }

    @PostMapping("/updateCommunityComments")
    public String updateComment(@RequestBody CommentDto commentDto){
        try {
            String result = commentService.modifyComment(commentDto);
            return result;
        }catch (Exception e){
            return "f";
        }
    }

    @PostMapping("/deleteCommunityComments")
    public String deleteComment(@RequestBody CommentDto commentDto){
        try {
            String result = commentService.deleteComment(commentDto);
            return result;
        }catch (Exception e){
            return "f";
        }
    }
}
