package NewWorld.repository;

import NewWorld.domain.Post;
import NewWorld.dto.PostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

/**
 * 2024.01.28 jeonil
 *  게시판 관리
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    /**
     * 회원찾기
     * @param userNickname
     * @return
     */
    @Query( value = "select Post from User u left join fetch Post p " +
            "where u.nickname = :#{#postDto.userNickName} and " +
            "p.title = :#{#postDto.title} and p.makedDate = :#{#postDto.makedDate}")
    Post findBypost(@Param(value = "postDto") PostDto postDto);
    public Page<Post> findPostsByUserNickName(PageRequest pageable, String userNickname);
    public Post findPostByTitleAndUserNickNameAndMakedDate(String title, String userNickname, Date makeDate);


}
