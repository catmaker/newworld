package NewWorld.service;

import NewWorld.domain.User;

import java.util.List;

public interface RankingService {
    List<User> getAttendanceRanking();

    List<User> getScoreRanking();

    List<User> getTotalRanking();
}
