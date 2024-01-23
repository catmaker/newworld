package NewWorld.domain;

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
public class Game {

    @Id
    @GeneratedValue
    @Column(name = "game_id")
    private Long id;

    private String title;

    private String gameDescription;

    private String createNickName;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<User> userList;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Stage> stageList;

    @Builder
    public Game(Long id, String title, String gameDescription, String createNickName, List<User> userList, List<Stage> stageList) {
        this.id = id;
        this.title = title;
        this.gameDescription = gameDescription;
        this.createNickName = createNickName;
        this.userList = userList;
        this.stageList = stageList;
    }
}
