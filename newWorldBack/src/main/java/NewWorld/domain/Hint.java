package NewWorld.domain;

import NewWorld.MemberType;
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

    @Enumerated(value = EnumType.STRING)
    private MemberType memberType;

    @Builder
    public Hint(Long id, String hint, MemberType memberType) {
        this.id = id;
        this.hint = hint;
        this.memberType = memberType;
    }
}
