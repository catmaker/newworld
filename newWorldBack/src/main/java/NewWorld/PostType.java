package NewWorld;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

/**
 * 2024.02.10 jeonil
 * 게시물 구분
 */
@Getter
public enum PostType {
   QUESTION,RECOMMEND,ANNOUNCEMENT,NORMAL;
}
