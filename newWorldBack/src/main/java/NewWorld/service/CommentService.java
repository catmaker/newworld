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
    public String setComment(CommentDto commentDto);
    public String modifyComment(CommentDto commentDto) throws NotfindException;
    public String deleteComment(CommentDto commentDto) throws NotfindException;
}
