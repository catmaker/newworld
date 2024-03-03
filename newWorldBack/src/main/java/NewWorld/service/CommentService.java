package NewWorld.service;

import NewWorld.dto.CommentDto;

/**
 * 2024.01.30 jeonil
 * 댓글기능
 */
public interface CommentService {
    public String setComment(CommentDto commentDto);
    public String modifyComment(CommentDto commentDto);
    public String deleteComment(CommentDto commentDto);
}
