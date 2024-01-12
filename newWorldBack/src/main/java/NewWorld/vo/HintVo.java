package NewWorld.vo;

import NewWorld.Maker;
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
public class HintVo{

    @Id
    @GeneratedValue
    @Column(name = "hint_vo_id")
    private Long id;

    private String hint;

    @Enumerated(value = EnumType.STRING)
    private Maker maker;

    @Builder
    public HintVo(Long id, String hint, Maker maker) {
        this.id = id;
        this.hint = hint;
        this.maker = maker;
    }
}
