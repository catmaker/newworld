package NewWorld;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 2024.01.12 jeonil
 * 개발자 구분
 */
@Getter
public enum MemberType {
   ADMIM,USER;
}
