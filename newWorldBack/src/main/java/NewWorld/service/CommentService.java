package NewWorld.service;

import NewWorld.domain.Comment;
import NewWorld.dto.CommentDto;
import NewWorld.exception.CustomError;

/**
 * 2024.01.30 jeonil
 * 댓글기능
 */
public interface CommentService {
    public CommentDto setComment(CommentDto commentDto) throws CustomError;
    public Comment modifyComment(CommentDto commentDto) throws CustomError;
    public void deleteComment(CommentDto commentDto) throws CustomError;
}
