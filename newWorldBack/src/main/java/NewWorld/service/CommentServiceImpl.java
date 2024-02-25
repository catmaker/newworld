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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

/**
 * 2024.01.30 jeonil
 * 댓글기능
 */
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;


    @Override
    public void setComment(PostDto postDto, String comment, String userNickname) {
        Optional<Post> byId = postRepository.findById(postDto.getPostId());
        if(byId.isPresent()){
            Post post = byId.get();
            Comment newComment = Comment.builder().
                    comment(comment).
                    makedDate(LocalDateTime.now()).
                    userNickName(userNickname).build();

            commentRepository.save(newComment);

            if(post.getCommentList() == null){
                post.setComment(new ArrayList<>().add(newComment));
            }else{
                post.setComment(post.getCommentList().add(newComment));
            }
        }
    }

    @Override
    public CommentDto modifyComment(CommentDto commentDto) throws NotfindException {
        Comment comment = commentRepository.findByUserNickNameAndMakedDate(commentDto.getUserNickName(), commentDto.getMakedDate());
        if(comment == null){
            throw new NotfindException("찾을 수 없는 정보입니다.");
        }
        Comment newComment = comment.modifyComment(commentDto.getComment());
        CommentDto dto = new CommentDto().toDto(newComment);
        return dto;
    }

    @Override
    public void deleteComment(CommentDto commentDto) throws NotfindException {
        Comment comment = commentRepository.findByUserNickNameAndMakedDate(commentDto.getUserNickName(), commentDto.getMakedDate());
        if(comment == null){
            throw new NotfindException("이미 삭제된 댓글입니다");
        }
        commentRepository.delete(comment);
    }

}
