package NewWorld.service;

import NewWorld.domain.Comment;
import NewWorld.domain.Post;
import NewWorld.dto.CommentDto;
import NewWorld.exception.CustomError;
import NewWorld.exception.ErrorCode;
import NewWorld.repository.CommentRepository;
import NewWorld.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * 댓글기능
 */
@Service
@RequiredArgsConstructor
@Transactional
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Override
    public CommentDto setComment(CommentDto commentDto) throws CustomError {
        Post post = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new CustomError(ErrorCode.NOT_FOUND));

        Comment comment = Comment.of(commentDto);
        post.setComment(comment);

        return CommentDto.of(comment);
    }

    @Override
    public Comment modifyComment(CommentDto commentDto) throws CustomError {
        Comment comment = getComment(commentDto.getCommentId());

        return comment.modifyComment(commentDto.getComment());
    }

    @Override
    public void deleteComment(CommentDto commentDto) throws CustomError {
        Post post = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new CustomError(ErrorCode.NOT_FOUND));

        post.deleteComment(commentDto.getCommentId());
    }

    public Comment getComment(Long commentId) throws CustomError {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CustomError(ErrorCode.NOT_FOUND));

        return comment;
    }

}
