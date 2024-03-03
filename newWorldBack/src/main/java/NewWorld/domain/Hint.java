package NewWorld.domain;

import NewWorld.MemberType;
import NewWorld.dto.HintDto;
import NewWorld.dto.QuizDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 2024.01.12 jeonil
 * 퀴즈 힌트
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Hint{

    @Id
    @GeneratedValue
    @Column(name = "hint_id")
    private Long id;

    private String hint;


    @Builder
    public Hint(Long id, String hint, MemberType memberType) {
        this.id = id;
        this.hint = hint;
    }

    public static Hint of(HintDto hintDto){
        Hint newHint = Hint.builder().
                hint(hintDto.getHint()).
                memberType(hintDto.getMemberType())
                .build();

        return newHint;
    }
    public Hint changeHint(String hint){
        this.hint = hint;
        return this;
    }


}
