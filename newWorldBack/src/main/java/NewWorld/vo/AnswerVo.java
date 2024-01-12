package NewWorld.vo;

import NewWorld.Maker;
import jakarta.persistence.*;
import lombok.*;

/**
 * 2024.01.12 jeonil
 * 퀴즈 정답
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnswerVo {

    @Id @GeneratedValue
    @Column(name = "answer_vo_id")
    private Long id;

    private String answer;

    @Enumerated(value = EnumType.STRING)
    private Maker maker;

    @Builder
    public AnswerVo(Long id, String answer, Maker maker) {
        this.id = id;
        this.answer = answer;
        this.maker = maker;
    }
}
