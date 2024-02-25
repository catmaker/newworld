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
 * 2024.01.30 jeonil
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

            Comment newComment = Comment.builder().
                    comment(commentDto.getComment()).
                    makedDate(LocalDateTime.now()).
                    userNickName(commentDto.getNickName()).build();

            commentRepository.save(newComment);

            if (post.getCommentList() == null) {
                post.setComment(List.of(newComment));
            } else {
                post.getCommentList().add(newComment);
            }
            return "s";
        }
        return "f";
    }

    @Override
    public String modifyComment(CommentDto commentDto) throws NotfindException {
        Comment comment = getComment(commentDto.getCommentId());

        if (comment == null) {
            return "f";
        }
        Comment newComment = comment.modifyComment(commentDto.getComment());

        return "s";
    }

    @Override
    public String deleteComment(CommentDto commentDto) throws NotfindException {
        Optional<Post> byId = postRepository.findById(commentDto.getPostId());

        if (byId.isPresent()) {
            Post post = byId.get();

            List<Comment> commentList = post.getCommentList();

            for (int i= 0; i< commentList.size(); i++) {
                Comment comment = commentList.get(i);

                if (comment.getId() == commentDto.getCommentId()) {
                    commentList.remove(i);
                    return "s";
                }
            }
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
