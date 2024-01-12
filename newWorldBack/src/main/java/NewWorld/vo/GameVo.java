package NewWorld.vo;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 2024.01.12 jeonil
 * 게임
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameVo {

    @Id
    @GeneratedValue
    @Column(name = "game_vo_id")
    private Long id;

    private String title;

    private String gameDescription;

    private String createNickName;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<UserVo> userVoList;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<StageVo> stageVoList;

    @Builder
    public GameVo(Long id, String title, String gameDescription, String createNickName, List<UserVo> userVoList, List<StageVo> stageVoList) {
        this.id = id;
        this.title = title;
        this.gameDescription = gameDescription;
        this.createNickName = createNickName;
        this.userVoList = userVoList;
        this.stageVoList = stageVoList;
    }
}
