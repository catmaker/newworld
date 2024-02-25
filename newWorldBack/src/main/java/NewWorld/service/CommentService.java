package NewWorld.service;

import NewWorld.domain.Comment;
import NewWorld.dto.CommentDto;
import NewWorld.dto.PostDto;
import NewWorld.exception.NotfindException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 2024.01.30 jeonil
 * 댓글기능
 */
public interface CommentService {
    public void setComment(PostDto post, String comment, String userNickname);
    public CommentDto modifyComment(CommentDto commentDto) throws NotfindException;
    public void deleteComment(CommentDto commentDto) throws NotfindException;
}
