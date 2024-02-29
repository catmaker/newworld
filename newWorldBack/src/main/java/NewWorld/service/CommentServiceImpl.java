package NewWorld.service;

import NewWorld.domain.Comment;
import NewWorld.domain.Post;
import NewWorld.dto.CommentDto;
import NewWorld.dto.PostDto;
import NewWorld.exception.NotfindException;
import NewWorld.repository.CommentRepository;
import NewWorld.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
    public String setComment(CommentDto commentDto) {
        Optional<Post> byId = postRepository.findById(commentDto.getPostId());
        if (byId.isPresent()) {
            Post post = byId.get();

            if (commentDto.getComment() == null) {
                return "comment null";
            }

            Comment comment = Comment.of(commentDto);
            //commentRepository.save(comment);
            post.setComment(comment);
            return "s";
        }
        return "f";
    }

    @Override
    public String modifyComment(CommentDto commentDto) {
        Comment comment = getComment(commentDto.getCommentId());

        if (comment == null) {
            return "f";
        }
        comment.modifyComment(commentDto.getComment());

        return "s";
    }

    @Override
    public String deleteComment(CommentDto commentDto) {
        Optional<Post> byId = postRepository.findById(commentDto.getPostId());

        if (byId.isPresent()) {
            Post post = byId.get();

            Comment comment = Comment.of(commentDto);
            post.deleteComment(comment);
            return "s";
        }
        return "f";
    }

    public Comment getComment(Long commentId) {
        Optional<Comment> byId = commentRepository.findById(commentId);

        if (byId.isPresent()) {
            Comment comment = byId.get();
            return comment;
        }
        return null;
    }

}
