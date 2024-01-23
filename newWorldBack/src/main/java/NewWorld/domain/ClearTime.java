package NewWorld.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 2024.01.12 jeonil
 * 게임 클리어타임
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClearTime {

    @Id
    @GeneratedValue
    @Column(name = "cleartime_id")
    private Long id;

    private String gameName;

    private String stageDescription;

    private int expr;

    private String imageUrl;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Quiz> quizs;

    @Builder
    public ClearTime(Long id, String gameName, String stageDescription, int expr, String imageUrl, List<Quiz> quizs) {
        this.id = id;
        this.gameName = gameName;
        this.stageDescription = stageDescription;
        this.expr = expr;
        this.imageUrl = imageUrl;
        this.quizs = quizs;
    }
}
