package NewWorld.vo;

import NewWorld.Maker;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 2024.01.12 jeonil
 * 게임 스테이지
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StageVo {

    @Id
    @GeneratedValue
    @Column(name = "stage_vo_id")
    private Long id;

    private String title;

    private String stageDescription;

    private int expr;

    private String imageUrl;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<QuizVo> quizVos;

    @Builder
    public StageVo(Long id, String title, String stageDescription, int expr, String imageUrl, List<QuizVo> quizVos) {
        this.id = id;
        this.title = title;
        this.stageDescription = stageDescription;
        this.expr = expr;
        this.imageUrl = imageUrl;
        this.quizVos = quizVos;
    }
}
